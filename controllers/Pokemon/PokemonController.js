/* eslint-disable no-underscore-dangle */
const Pokemon = require('../../models/PokemonModel');
const User = require('../../models/UserModel');
const { createPokemonValidator, modifyPokemonValidator } = require('./PokemonValidator');

const PokemonController = {
    create: async (req, res) => {
        try {
            if (!req.user.admin) return res.status(403).json({ message: 'Action Denied' });

            console.log(typeof parseInt(req.body['pokedex-number'], 10))

            await createPokemonValidator(req.body);

            const newPokemon = new Pokemon({
                name: req.body.name,
                description: req.body.description,
                dateReleased: req.body['date-released'],
                type: req.body.type,
                pokedexNumber: parseInt(req.body['pokedex-number'], 10),
                ability: req.body.ability,
                image: req.file.location,
            });

            await newPokemon.save();

            return res.status(201).json({ message: 'Created successfully', data: newPokemon });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    modifyPokemon: async (req, res) => {
        try {
            if (!req.user.admin) return res.status(403).json({ message: 'Action Denied' });

            const pokemon = await Pokemon.findOne(req.params.name);

            if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });

            await modifyPokemonValidator(req.body);

            pokemon.name = req.body.name || pokemon.name;
            pokemon.description = req.body.description || pokemon.description;
            pokemon.dateReleased = req.body['date-released'] || pokemon.dateReleased;
            pokemon.type = req.body.type || pokemon.type;
            pokemon.pokedexNumber = req.body['pokedex-number'] || pokemon.pokedexNumber;
            pokemon.ability = req.body.ability || pokemon.ability;
            pokemon.image = req.file.location || pokemon.image;

            await pokemon.save();

            return res.status(200).json({ message: 'Modified successfully', data: pokemon });
        } catch (err) {
            return res.status(400).json(err.message);
        }
    },

    removePokemon: async (req, res) => {
        try {
            const deleted = await Pokemon.findOneAndDelete({ name: req.body.name });

            return res.status(200).json({ message: 'Deleted successfully', data: deleted });
        } catch (err) {
            return res.status(400).json(err.message);
        }
    },

    getAllPokemon: async (req, res) => {
        try {
            const { page = 1, limit = 12 } = req.query;

            const pkmn = await Pokemon.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await Pokemon.countDocuments();

            return res.status(200).json({
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                pkmn,
            });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    likePokemon: async (req, res) => {
        try {
            const actualLiked = await User.findOne({ _id: req.user._id }).select('fav-pkmn');

            if (actualLiked['fav-pkmn'].includes(req.body.name)) {
                return res.status(400).json({ message: 'You have already liked this pkmn' });
            }

            const newLiked = actualLiked['fav-pkmn'].concat(req.body.name);

            const updatedUser = await User.findOneAndUpdate(

                { _id: req.user._id }, { $set: { 'fav-pkmn': newLiked } }, { new: true },
            );

            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    unlikePokemon: async (req, res) => {
        try {
            const actualLiked = await User.findOne({ _id: req.user._id }).select('fav-pkmn');

            if (!actualLiked['fav-pkmn'].includes(req.body.name)) {
                return res.status(400).json({ message: 'You have already unliked this pkmn' });
            }

            const newLiked = actualLiked['fav-pkmn'].remove(req.body.name);

            const updatedUser = await User.findOneAndUpdate(
                { _id: req.user._id }, { $set: { 'fav-pkmn': newLiked } }, { new: true },
            );

            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
};

module.exports = PokemonController;
