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

module.exports = router;