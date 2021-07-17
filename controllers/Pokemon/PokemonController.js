const Pokemon = require('../../models/PokemonModel');
const User = require('../../models/UserModel');
const { createPokemonValidator, modifyPokemonValidator } = require('./PokemonValidator');

const PokemonController = {
    create: async (req, res) => {
        try {
            if (!req.user.admin) return res.status(403).json({ message: 'Action Denied' });

            await createPokemonValidator(req.body);

            const newPokemon = new Pokemon({
                name: req.body.name,
                description: req.body.description,
                dateReleased: req.body['date-released'],
                type: req.body.type,
                pokedexNumber: req.body['pokedex-number'],
                ability: req.body.ability,
                image: req.file.location,
            });

            await newPokemon.save();

            return res.status(201).json({ message: 'Created successfully', data: newPokemon });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    // modifyPokemon: async (req, res) => {
    //     try {
    //         if (req.user.admin == false)
    //             return res.status(403).json({ message: 'Action Denied'});

    //         var actualPokemon = await Pokemon.findOne({ name: req.body.name });
    //         const updateConflict = await Pokemon.findOne({ name: req.body.name });

    //         if (updateConflict)
    //             throw {error: true, message: "This pokemon already exits"};
    //         else if (!actualProduct)
    //             throw {error: true, message: "Product not found"};

    //     } catch (err) {
    //         return res.status(400).json(err.message);
    //     }
    // },

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
            // eslint-disable-next-line no-underscore-dangle
            const actualLiked = await User.findOne({ _id: req.user._id }).select('fav-pkmn');

            if (actualLiked['fav-pkmn'].includes(req.body.name)) {
                return res.status(400).json({ message: 'You have already liked this pkmn' });
            }

            const newLiked = actualLiked['fav-pkmn'].concat(req.body.name);

            const updatedUser = await User.findOneAndUpdate(
                // eslint-disable-next-line no-underscore-dangle
                { _id: req.user._id }, { $set: { 'fav-pkmn': newLiked } }, { new: true },
            );

            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    unlikePokemon: async (req, res) => {
        try {
            // eslint-disable-next-line no-underscore-dangle
            const actualLiked = await User.findOne({ _id: req.user._id }).select('fav-pkmn');

            if (!actualLiked['fav-pkmn'].includes(req.body.name)) {
                return res.status(400).json({ message: 'You have already unliked this pkmn' });
            }

            const newLiked = actualLiked['fav-pkmn'].remove(req.body.name);

            const updatedUser = await User.findOneAndUpdate(
                // eslint-disable-next-line no-underscore-dangle
                { _id: req.user._id }, { $set: { 'fav-pkmn': newLiked } }, { new: true },
            );

            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
};

module.exports = PokemonController;
