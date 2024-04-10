const express = require('express');
const router = express.Router();
const conn = require('./../mariadb');
const {StatusCodes} = require('http-status-codes');
const {join, login, pwdResetRequest, pwdReset} = require('./../controllers/UserController')

router.use(express.json());

router.post('/join', join);
router.post('/login', login);
router.post('/reset', pwdResetRequest);
router.put('/reset', pwdReset);

module.exports = router;