const passport = require('passport');
var express = require('express');
var router = express.Router();
var { login, register, createAdmin, deleteUser, getAllUsers, 
    getCurrentUser, getLikedPokemon, getLikedPokemonByUserId } = require('../controllers/User/UserController');

const options = { session: false }

router.post     ('/create-admin', passport.authenticate('bearer', options), createAdmin);
router.post     ('/register', register);
router.post     ('/login', passport.authenticate('local', options), login);

router.get      ('/current', passport.authenticate('bearer', options), getCurrentUser);
router.get      ('/:id/pkmn', passport.authenticate('bearer', options), getLikedPokemonByUserId);
router.get      ('/pkmn', passport.authenticate('bearer', options), getLikedPokemon);
router.get      ('/', passport.authenticate('bearer', options), getAllUsers);

router.delete   ('/delete-user', passport.authenticate('bearer', options), deleteUser);

module.exports = router;