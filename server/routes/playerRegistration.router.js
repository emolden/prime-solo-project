const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//PUT route updates the liability_acknowledgment cell in the user table
// given the signature and user id
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

module.exports = router;