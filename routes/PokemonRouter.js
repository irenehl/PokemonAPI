const passport = require('passport');
const express = require('express');

const router = express.Router();
const {
    create, removePokemon, likePokemon, unlikePokemon, getAllPokemon,
} = require('../controllers/Pokemon/PokemonController');

const upload = require('../services/ImageUpload');

const singleUpload = upload.single('image');

const options = { session: false };

router.get('/', getAllPokemon);

router.post('/create', passport.authenticate('bearer', options), singleUpload, create);

router.delete('/delete', passport.authenticate('bearer', options), removePokemon);

router.put('/unfav', passport.authenticate('bearer', options), unlikePokemon);
router.put('/fav', passport.authenticate('bearer', options), likePokemon);

module.exports = router;
