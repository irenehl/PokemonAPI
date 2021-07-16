const passport = require('passport');
var express = require('express');
var router = express.Router();
var { login, register, createAdmin, deleteUser, getAllUsers, getCurrentUser } = require('../controllers/User/UserController');

const options = { session: false }

router.post('/register', register);
router.post('/login', passport.authenticate('local', options), login);
router.post('/create-admin', passport.authenticate('bearer', options), createAdmin);

router.get('/current', getCurrentUser);
router.get('/all-users', passport.authenticate('bearer', options), getAllUsers);

router.delete('/delete-user', passport.authenticate('bearer', options), deleteUser);

module.exports = router;