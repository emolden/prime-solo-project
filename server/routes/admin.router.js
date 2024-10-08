const express = require('express');
const {
	rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//GET route requests the league data and team data from the database
//route sends an array of objects back to the admin saga
router.get('/leaguedata', rejectUnauthenticated, async (req, res) => {
    console.log('in the GET route of /api/admin/leaguedata');
	let connection;

	try {
		connection = await pool.connect()

		await connection.query('BEGIN;')

    const leagueDataQueryText = `
    SELECT 
	"user_league_type"."id" AS "id",
	"user_league_type"."league_id" AS "league_id",
	"ult_team"."team_id" AS "team_id",
	"ult_team"."id" AS "user_league_type_team_id",
	"user"."id" AS "user_id",
	"user"."name" AS "name",
	"user"."email" AS "email",
	"user"."phone_number" AS "phone_number",
	"user"."birthdate" AS "birthdate",
	"user_league_type"."is_captain" AS "captain",
	"user"."is_pitcher" AS "pitcher",
	"user_league_type"."small_group_input" AS "small_group_input",
	"registration_type"."type" AS "registration_type",
	"user_league_type"."team_name_input" AS "team_name_input",
	"user"."hitting_skill" AS "hitting",
	"user"."fielding_skill" AS "fielding",
	"leagues"."name" AS "league",
	"teams"."name" AS "team",
	"positions"."name" AS "positions"
	FROM "user"
	JOIN "user_league_type"
		ON "user"."id" = "user_league_type"."user_id"
	INNER JOIN "leagues"
		ON "user_league_type"."league_id" = "leagues"."id"
	LEFT JOIN "ult_team"
		ON "user_league_type"."id" = "ult_team"."user_league_type_id"
	LEFT JOIN "teams"
		ON "teams"."id" = "ult_team"."team_id"
	FULL JOIN "user_positions"
	ON "user"."id" = "user_positions"."user_id"
		LEFT JOIN "positions"
	ON "user_positions"."position_id" = "positions"."id"
	LEFT JOIN "registration_type"
	ON "user_league_type"."type_id" = "registration_type"."id";

	`;

	const leagueDataQueryResult = await connection.query(leagueDataQueryText)

	const teamQueryText = `
		SELECT * FROM "teams";
	`;

	const teamQueryResult = await connection.query(teamQueryText)

	await connection.query('COMMIT;')

	await connection.release()

	const response = {
		leagueData : leagueDataQueryResult.rows,
		teamData : teamQueryResult.rows
	}
	res.send(response)
	} catch(dbErr) {
            console.log('Error in get', dbErr)
			await connection.query('ROLLBACK;')
			await connection.release()
            res.sendStatus(500)
        }
});

//POST route sends an INSERT query to the ult_team table
// route comes from 
router.post ('/playerteam', rejectUnauthenticated, async (req, res) => {
	console.log('in POST /api/admin/playerteam and req.body is: ', req.body);
	let connection;
	try {
		connection = await pool.connect()

		await connection.query('BEGIN;')

		//ultID is the user_league_team_id and team is the 
		const { utlId, team } = req.body

		const teamQueryText = `
			SELECT "id" FROM "teams"
				WHERE "name" = $1;
		`;

		const teamQueryValue = [team]

		//get the id of the team a player was put on
		const teamQueryResult = await connection.query(teamQueryText, teamQueryValue);

		// console.log('in POST /api/admin/playerteam and response from the database is: ', teamQueryResult.rows[0].id)
	
		const teamId = teamQueryResult.rows[0].id

		const teamInsertText = `
			INSERT INTO "ult_team"
			("user_league_type_id", "team_id")
			VALUES
			($1, $2);
		`;

		teamInsertValues = [utlId, teamId]

		//use the team id to insert a new row into the ult_team table
		const insertTeamResult = await connection.query(teamInsertText, teamInsertValues)

		await connection.query ('COMMIT;')

		res.sendStatus(201);
	} catch (error) {
		console.log('error in POST /api/admin/playerteam: ', error);
		await connection.query('ROLLBACK;')
		res.sendStatus(500);
	} finally {
		await connection.release()
	}
});

//DELETE route sends a DELETE query to the ult_team table
router.delete('/playerteam/:id', rejectUnauthenticated, (req, res) => {
	console.log('in /api/admin/playerteam DELETE route and the param is: ', req.params)

	const teamToDelete = req.params.id;

	//delete a row from the ult_team table
	const sqlText = `
		DELETE FROM "ult_team"
			WHERE "id" = $1;
	`;

	const sqlValue = [teamToDelete];

	pool.query (sqlText, sqlValue)
		.then((result) => {
			res.sendStatus(200);
		})
		.catch((dbErr) => {
			console.log('error in /playerteam/:id DELETE router: ', dbErr)
			res.sendStatus(500);
		})
})

//PUT route sends an UPDATE query to the ult_team table
router.put('/playerteam/:id', rejectUnauthenticated, async (req, res) => {
	// console.log('/api/admin/palyerteam/:id has a request!: ', req.params, req.body);

	const userLeagueTypeTeamId = req.params.id;
	const team = req.body.team;

	let connection;
	try {
		connection = await pool.connect()

		await connection.query('BEGIN;')

		const teamQueryText = `
			SELECT "id" FROM "teams"
				WHERE "name" = $1;
		`;

		const teamQueryValue = [team]

		//get the team id of the team the player was added to
		const teamQueryResult = await connection.query(teamQueryText, teamQueryValue);

		const teamId = teamQueryResult.rows[0].id

		const teamInsertText = `
			UPDATE "ult_team"
				SET "team_id" = $1
				WHERE "id" = $2;
		`;

		teamInsertValues = [teamId, userLeagueTypeTeamId]

		//update the row in the ult_team table with the new team id
		const insertTeamResult = await connection.query(teamInsertText, teamInsertValues)

		await connection.query ('COMMIT;')

		res.sendStatus(201);
	}  
	catch (error) {
		console.log('error in PUT /api/admin/playerteam: ', error);
		await connection.query('ROLLBACK;')
		res.sendStatus(500);
	} 
	finally {
		await connection.release()
	}
})

  module.exports = router;