const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

//request all the rows from the user_league_type table with which the user is associated
router.get('/league_type/:id', (req, res) => {
  // console.log('in /api/user/league_type GET route and the param is: ', req.params)

  const userId = req.params.id;

  const sqlText = `
    SELECT * FROM "user_league_type"
      WHERE "user_id" = $1;
  `;

  const sqlValue = [userId];

  pool.query (sqlText, sqlValue)
    .then ((result) => {
      res.send(result.rows)
    })
    .catch((dbErr) => {
      console.log('error in /user/league_type/:id GET router: ', dbErr)
      res.sendStatus(500);
    })
})

router.get('/position/:id', (req, res) => {
  // console.log('in /api/user/position GET route and the param is: ', req.params)

  const userId = req.params.id;

  const sqlText = `
    SELECT * FROM "user_positions"
      WHERE "user_id" = $1;
  `;

  const sqlValue = [userId];

  pool.query (sqlText, sqlValue)
    .then ((result) => {
      res.send(result.rows)
    })
    .catch((dbErr) => {
      console.log('error in /user/position/:id GET router: ', dbErr)
      res.sendStatus(500);
    })
})

router.get('/current_teams/:id', async (req, res) => {
  // console.log('/api/user/current_teams/:id received a request!')

  const userId = req.params.id;
  let connection;
  try {
    connection = await pool.connect()

    await connection.query('BEGIN;')

    // check the ult_teams table for the user's id
    const userTeamText = `
      SELECT 
        "ult_team"."id" AS "id",
        "ult_team"."user_league_type_id" AS "user_id",
        "ult_team"."team_id" AS "team_id",
        "teams"."name" AS "team_name",
        "teams"."league_id" AS "league_id"
        FROM "ult_team"
        JOIN "teams"
          ON "ult_team"."team_id" = "teams"."id"
        WHERE "user_id" = $1;
    `;

    const userTeamValues = [userId]

    const userTeamResult = await connection.query(userTeamText, userTeamValues)
    // console.log('userTeamResult from the /api/user/current_team/:id GET route: ', userTeamResult.rows)
    // userTeamResult will come back as an empty array or an array with objects of the form:
    // {id: 11, user_id: '7', team_id: '4', team_name: 'Spectrum Screenprinting', league_id: '2'}

    //fullTeams is an array of objects containing the full roster of players
    // for each of the teams the user is on. It will have the form:
    // [ {
    //      teamName: 'Storm Hawks', 
    //      players: [
    //                {id: 7, name: 'Charlotte Smitth', team_name: 'Storm Hawks'}
    //                ]
    //  }]
    let fullTeams = [];
    
    //if the userTeamResults array is not empty
    if(userTeamResult.rows.length > 0) {
      //loop through each object, using the team_id to return an
      //array of objects containing the names of all the players on 
      //the team
      for(let team of userTeamResult.rows) {
        const currentTeamText = `
        SELECT 
          "ult_team"."id" AS "id",
          "user"."name" AS "name",
          "teams"."name" AS "team_name"
          FROM "user"
          JOIN "user_league_type"
            ON "user"."id" = "user_league_type"."user_id"
          JOIN "ult_team"
            ON "user_league_type"."id" = "ult_team"."user_league_type_id"
          JOIN "teams"
            ON "ult_team"."team_id" = "teams"."id"
          WHERE "teams"."id" = $1
          ORDER BY "user"."name";
      `;

      const currentTeamValues = [team.team_id]

      // use the team ids from the response to return the full teams to the user saga
      const currentTeamResult = await connection.query(currentTeamText, currentTeamValues)
    
      let newTeam = {
        teamName: team.team_name,
        players: currentTeamResult.rows
      };
      // console.log(newTeam)

      fullTeams.push(newTeam)
    }

      await connection.query('Commit;')

      //the length of this array will be the number of teams the user is on
      res.send(fullTeams)
    }
    else {
      await connection.query('Commit;')

      //fullTeams will be an empty array
      res.send(fullTeams)
    }
  } catch (error) {
    console.log('error in api/user/current_teams/:id ', error)
    await connection.query('RollBack;')
    res.sendStatus(500);
  } finally {
    await connection.release()
  }
  



})

module.exports = router;
