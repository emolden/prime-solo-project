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

router.get('/api/user/current_teams/:id', async (req, res) => {

  const userId = req.params.id;
  let connection;
  try {
    connection = await poolconnect()

    await connection.query('BEGIN;')

    // check the user_teams table for the user's id
    const userTeamText = `
      SELECT * FROM "user_team"
        WHERE "user_id" = $1;
    `;

    const userTeamValues = [userId]

    const userTeamResult = await connection.query(userTeamText, userTeamValues)
    console.log('userTeamResult from the /api/user/current_team/:id GET route: ', userTeamResult)

      // use the team ids from the response to return the full teams to the user saga
    if(userTeamResult.rows.length === 1) {
      const currentTeamText = `
        SELECT 
          "user_team"."id" AS "id",
          "user"."name" AS "name",
          "teams"."name" AS "team_name"
          FROM "user"
          JOIN "user_team"
            ON "user"."id" = "user_team"."user_id"
          JOIN "teams"
            ON "user_team"."team_id" = "teams"."id"
          WHERE "teams"."id" = $1;
      `;

      const currentTeamValues = [userTeamResult.rows[0].team_id]

      const currentTeamResult = await connection.query(currentTeamText, currentTeamValues)

      await connection.query('Commit;')

      res.send(currentTeamResult)
    }
    else if (userTeamResult.rows.length === 2) {
      const currentTeamText = `
        SELECT 
          "user_team"."id" AS "id",
          "user"."name" AS "name",
          "teams"."name" AS "team_name"
          FROM "user"
          JOIN "user_team"
            ON "user"."id" = "user_team"."user_id"
          JOIN "teams"
            ON "user_team"."team_id" = "teams"."id"
          WHERE "teams"."id" = $1 OR "teams"."id" = $2;
      `;

      const currentTeamValues = [userTeamResult.rows[0].team_id, userTeamResult.rows[1].team_id]

      const currentTeamResult = await connection.query(currentTeamText, currentTeamValues)

      await connection.query('Commit;')

      res.send(currentTeamResult)
    }
    else {
      res.send([])
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
