const passport = require('passport');
var express = require('express');
var router = express.Router();
var { login, register, createAdmin } = require('../controllers/User/UserController');

const options = { session: false }

router.post('/login', passport.authenticate('local', options), login);
router.post('/register', register);

router.post('/create-admin', passport.authenticate('bearer', options), createAdmin);


module.exports = router;