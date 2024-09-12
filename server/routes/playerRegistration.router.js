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

    const { user_id, username, name, email, phone_number, birthdate } = req.body;

    sqlText = `
        UPDATE "user"
            SET "name" = $1,
                "username" = $2,
                "email" = $3,
                "phone_number" = $4,
                "birthdate" = $5
            WHERE "id" = $6;
    `;

    sqlValues = [name, username, email, phone_number, birthdate, user_id];

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

            const userLeagueValue = [Number(user_id), Number(league_id)]

            //checks to see if the user is already registered with the silver league
            const userLeagueResult = await connection.query(userLeagueText, userLeagueValue);
            console.log('database response to userLeague', userLeagueResult)

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

                const updateUserLeagueValues = [Number(user_id), Number(league_id), Number(type_id), is_captain, small_group_input, team_input, userLeagueId]

                const updateUserLeagueResult = await connection.query(updateUserLeagueText, updateUserLeagueValues)
                console.log('database response to updateUserLeague', updateUserLeagueResult)
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

                const insertUserLeagueValues = [Number(user_id), Number(league_id), Number(type_id), is_captain, small_group_input, team_input]

                const insertUserLeagueResult = await connection.query(insertUserLeagueText, insertUserLeagueValues)
                console.log('database response to insertUserLeague', insertLeagueResult)
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

//PUT route UPDATES the user table with the fielding_skill, hitting_skill, and is_pitcher
// and either INSERTS or UPDATES the user_position table with the user_id and position_id
router.put('/skill_and_experience', async (req, res) => {
    // console.log('playerRegistration router received a request via /api/player_registration/skill_and_experience ', req.body)

    const {user_id, hitting_skill, fielding_skill, is_pitcher, position_id} = req.body;

    let connection;
    try {
        connection = await pool.connect()

        await connection.query('BEGIN;')

        //update the user table with the new data
        const updateUserText = `
            UPDATE "user"
                SET "hitting_skill" = $1,
                    "fielding_skill" = $2,
                    "is_pitcher" = $3
                WHERE "id" = $4;
        `;

        const updateUserValues = [hitting_skill, fielding_skill, is_pitcher, user_id];

        const updateUserResult = await connection.query(updateUserText, updateUserValues)

        //check for an existing row in the user_positions table with the user_id
        const userPositionText = `
            SELECT * FROM "user_positions"
                WHERE "user_id" = $1;
        `;

        const userPositionValue = [user_id];

        const userPositionResult = await connection.query(userPositionText, userPositionValue);

        if (userPositionResult.rows[0]) {
            //a row with the users id already exists
            const updateUserPositionText = `
                UPDATE "user_positions"
                    SET "position_id" = $1
                    WHERE "user_id" = $2;
            `;

            const updateUserPositionValues = [position_id, user_id];

            const updateUserPositionResult = await connection.query(updateUserPositionText, updateUserPositionValues);
        }
        else {
            const insertUserPositionText = `
                INSERT INTO "user_positions"
                ("user_id", "position_id")
                VALUES
                ($1, $2);
            `;

            const insertUserPositionValues = [user_id, position_id];

            const instertUserPositionResult = await connection.query(insertUserPositionText, insertUserPositionValues);
        }

        await connection.query('Commit;')

        res.sendStatus(201);
    } catch (error) {
        console.log('error in /api/player_registration/skill_and_experience PUT route: ', error)
        await connection.query('ROLLBACK;')
        res.sendStatus(500);
    } finally {
        await connection.release()
    }

})

module.exports = router;