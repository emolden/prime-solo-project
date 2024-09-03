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
router.get('/', (req, res) => {
    console.log('in the GET route of /api/admin');

    sqlText = `
      SELECT 
		"user"."id" AS "id",
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
		FULL JOIN "user_league_team"
		ON "user"."id" = "user_league_team"."user_id"
		LEFT JOIN "leagues"
		ON "user_league_team"."league_id" = "leagues"."id"
		LEFT JOIN "teams"
		ON "teams"."id" = "user_league_team"."team_id"
		FULL JOIN "user_positions"
		ON "user"."id" = "user_positions"."user_id"
		LEFT JOIN "positions"
		ON "user_positions"."position_id" = "positions"."id"
		FULL JOIN "user_type"
		ON "user"."id" = "user_type"."user_id"
		LEFT JOIN "registration_type"
		ON "user_type"."type_id" = "registration_type"."id";
	`;

    pool.query(sqlText)
        .then(dbRes => {
            // console.log('response from the database in GET /api/admin:', dbRes.rows);
            res.send(dbRes.rows)
        })
        .catch(dbErr => {
            console.log('Error in get', dbErr)
            res.sendStatus(500)
        })
});

  module.exports = router;