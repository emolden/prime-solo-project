const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//PUT route updates the liability_acknowledgment cell in the user table
// given the user id
router.put('/liability_acknowledgment', (req, res) => {
    // console.log('/api/player_registration/liability_acknowledgment PUT route received a request!', req.body)

    const { liability_acknowledgment, user_id } = req.body;

    sqlText = `
        UPDATE "user"
            SET "liability_acknowledgment" = $1
            WHERE "id" = $2;
    `;

    sqlValues = [liability_acknowledgment, user_id];

    pool.query (sqlText, sqlValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('error in /player_registration/liability_acknowledgment PUT route: ', dbErr);
        })
})

//PUT route updates the name, email, phone number, and birthdate cells in the user table
// given the user id
router.put('/player_information', (req, res) => {
    // console.log('/api/player_registration/liability_acknowledgment PUT route received a request!', req.body)

    const { user_id, name, email, phone_number, birthdate } = req.body;

    sqlText = `
        UPDATE "user"
            SET "name" = $1,
                "email" = $2,
                "phone_number" = $3,
                "birthdate" = $4
            WHERE "id" = $5;
    `;

    sqlValues = [name, email, phone_number, birthdate, user_id];

    pool.query (sqlText, sqlValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('error in /player_registration/player_information PUT route: ', dbErr);
        })
})

//POST route either UPDATES or INSERTS row in the user_league_type table
router.post('/league_registration', async (req, res) => {
    console.log('playerRegistration router received a request via /api/player_registration/league_registration ', req.body)

    let connection;
    try {
        connection = await pool.connect()

        await connection.query('BEGIN;')

        for (let league of req.body) {
            const { league_id, type_id, small_group_input, team_input, is_captain, user_id } = league
            console.log(user_id, league_id, type_id, is_captain, small_group_input, team_input)
        

            const userLeagueText = `
                SELECT "id" FROM "user_league_type"
                    WHERE "user_id" = $1 AND "league_id" = $2;
            `;

            const userLeagueValue = [user_id, league_id]

            //checks to see if the user is already registered with the silver league
            const userLeagueResult = await connection.query(userLeagueText, userLeagueValue);

            if (userLeagueResult.rows[0]) {
                //the user is already registered with the silver league
                const userLeagueId = userLeagueResult.rows[0].id

                const updateUserLeagueText = `
                    UPDATE "user_league_type"
                        SET "user_id" = $1,
                            "league_id" = $2,
                            "type_id" = $3,
                            "is_captain" = $4,
                            "small_group_input" = $5,
                            "team_name_input" = $6
                        WHERE "id" = $7;
                `;

                const updateUserLeagueValues = [user_id, league_id, type_id, is_captain, small_group_input, team_input, userLeagueId]

                const updateUserLeagueResult = await connection.query(updateUserLeagueText, updateUserLeagueValues)
            }
            else {
                //the user is not registered with the silver league
                //so we need to INSERT a new row in the user_league_type table
                const insertUserLeagueText = `
                    INSERT INTO "user_league_type"
                        ("user_id", "league_id", "type_id", "is_captain", "small_group_input", "team_name_input")
                        VALUES
                        ($1, $2, $3, $4, $5, $6);
                `;

                const insertUserLeagueValues = [user_id, league_id, type_id, is_captain, small_group_input, team_input]

                const insertUserLeagueResult = await connection.query(insertUserLeagueText, insertUserLeagueValues)
            }
        }

        await connection.query('Commit;')

        res.sendStatus(201);
    } catch (error) {
        console.log('error in /api/player_registration/silver_league_registration POST route: ', error)
        await connection.query('ROLLBACK;')
        res.sendStatus(500);
    } finally {
        await connection.release()
    }
});

router.post('/bronze_league_registration', (req, res) => {
    console.log('playerRegistration router received a request via /api/player_registration/bronze_league_registration ', req.body)
})

module.exports = router;