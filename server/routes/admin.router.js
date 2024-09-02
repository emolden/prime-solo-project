const express = require('express');
// const {
//   rejectUnauthenticated,
// } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
// const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('in the GET route of /api/admin');
  });

  module.exports = router;