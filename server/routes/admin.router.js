const express = require('express');
// const {
//   rejectUnauthenticated,
// } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
// const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//GET route requests the league data from the database
//route sends an array of objects back to the leagueData saga
router.get('/leaguedata', async (req, res) => {
    console.log('in the GET route of /api/admin/leaguedata');
	let connection;

	try {
		connection = await pool.connect()

		await connection.query('BEGIN;')

    const leagueDataQueryText = `
     SELECT 
	"user_league"."id" AS "id",
	"user_league"."league_id" AS "league_id",
	"user"."id" AS "user_id",
	"user"."name" AS "name",
	"user"."email" AS "email",
	"user"."phone_number" AS "phone_number",
	"user"."birthdate" AS "birthday",
	"user"."is_captain" AS "captain",
	"user"."is_pitcher" AS "pitcher",
	"user"."small_group" AS "small_group_input",
	"registration_type"."type" AS "registration_type",
	"user"."team_name" AS "team_name_input",
	"user"."hitting_skill" AS "hitting",
	"user"."fielding_skill" AS "fielding",
	"leagues"."name" AS "league",
	"teams"."name" AS "team",
	"positions"."name" AS "positions"
	FROM "user"
	FULL JOIN "user_league"
	ON "user"."id" = "user_league"."user_id"
	LEFT JOIN "leagues"
	ON "user_league"."league_id" = "leagues"."id"
	LEFT JOIN "user_team"
	ON "user"."id" = "user_team"."user_id"
	LEFT JOIN "teams"
	ON "teams"."id" = "user_team"."team_id"
	FULL JOIN "user_positions"
	ON "user"."id" = "user_positions"."user_id"
	LEFT JOIN "positions"
	ON "user_positions"."position_id" = "positions"."id"
	FULL JOIN "user_type"
	ON "user"."id" = "user_type"."user_id"
	LEFT JOIN "registration_type"
	ON "user_type"."type_id" = "registration_type"."id";
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

router.get('/playerteam', async (req, res) => {
	console.log('in get /api/admin/playerteam and req.params is: ', req.query)

	//
	const queryText = `
	SELECT *
		FROM "user_team"
		JOIN "teams"
			ON "user_team"."team_id" = "teams"."id"
		WHERE "user_team"."user_id" = $1 AND "teams"."league_id" = $2;
	`;

	const queryValues = [req.query.userId, req.query.league]

	pool.query(queryText, queryValues)
		.then((result) => {
			res.send(result.rows)
		})
		.catch((dberr) => {
			console.log('error in /api/admin/palyerteam: ', dberr);
		})

})

router.put('/', (req, res) => {
    console.log('in the PUT route of /api/admin', req.body);
});

  module.exports = router;