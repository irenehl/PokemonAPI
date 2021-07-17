const passport = require('passport');
var express = require('express');
var router = express.Router();
var { create, removePokemon, likePokemon, unlikePokemon, getAllPokemon } = require('../controllers/Pokemon/PokemonController')

const options = { session: false }

router.get      ('/', getAllPokemon);

router.post     ('/create', passport.authenticate('bearer', options), create);

router.delete   ('/delete', passport.authenticate('bearer', options), removePokemon);

router.put      ('/unfav', passport.authenticate('bearer', options), unlikePokemon);
router.put      ('/fav', passport.authenticate('bearer', options), likePokemon);

module.exports = router;