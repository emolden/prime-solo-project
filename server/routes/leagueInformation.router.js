const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//requests all the name and day options from the leagues table
router.get('/league_options', (req, res) => {
    // console.log('/api/league_information received a request!!')

    sqlText = `
        SELECT * FROM "leagues";
    `;

    pool.query (sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((dbErr) => {
            console.log('Error GET /api/league_information/league_options: ', dbErr);
            res.sendStatus(500);
        });
})

//requests all the registration types from the registration_type table
router.get('/registration_types', (req, res) => {
    // console.log('/api/league_information received a request!!')

    sqlText = `
        SELECT * FROM "registration_type";
    `;

    pool.query (sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((dbErr) => {
            console.log('Error GET /api/league_information/registration_types: ', dbErr);
            res.sendStatus(500);
        });
})

module.exports = router;