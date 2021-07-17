const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/UserModel');
const Pokemon = require('../../models/PokemonModel');
const { registerValidator } = require('./UserValidator');

const UserController = {
    login: async (req, res) => {
        console.log(req.body)
        
        try {
            if(req.user)
                return res.status(200).json({
                    token: jwt.sign({ _id: req.user._id, admin: req.user.admin }, process.env.TOKEN_KEY)
                });
            return res.status(404).json({ message: 'User not found' });
        }
        catch(err){
            console.log(err)
            return res.status(400).json(err.message);
        }
    },

    register: async (req, res) => {
        try {
            await registerValidator(req.body)

            let pass = await bcrypt.hash(req.body.password, 10);
            req.body.password = pass;

            const user = await User.create(req.body);

            return res.status(201).json(user);
        }
        catch(err) {
            return res.status(400).json({ message: err.message });
        }
    },

    createAdmin: async (req, res) => {
        try {
            if(req.user.admin == false)
                return res.status(403).json({ message: 'Action Denied'})
            
            await registerValidator(req.body)

            let pass = await bcrypt.hash(req.body.password, 10);
            req.body.password = pass;

            const user = await User.create(req.body);

            return res.status(201).json(user);
        }
        catch(err) {
            return res.status(400).json({ message: err.message });
        }
    },

    deleteUser: async(req, res) => {
        try {
            if(req.user.admin == false)
                return res.status(403).json({ message: 'Action Denied'})

            await User.findOneAndDelete({ _id: req.user._id })

            return res.status(200).json({ error: false, message: "Delete successfully" })
        }
        catch(err) {
            return res.status(400).json({ message: err.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            if(req.user.admin == false)
                return res.status(403).json({ message: 'Action Denied'})

            const { page = 1, limit = 12 } = req.query

            const users = await User.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()

            const count = await User.countDocuments()

            return res.status(200).json({
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                users
            })
        }
        catch(err) {
            return res.status(400).json({ message: err.message });
        }
    },
    
    getCurrentUser: async(req, res) => {
        const user = await User.findOne({ _id: req.user._id })

        return res.status(200).json(user)
    },
    
    getLikedPokemon: async(req, res) => {
        try {
            let actualLiked = await User.findOne({ _id: req.user._id }).select('fav-pkmn');

            let favPkmn = await Pokemon.find({ name: { $in: actualLiked['fav-pkmn'] } })

            return res.status(200).json({ data: favPkmn });
        }
        catch(err) {
            return res.status(400).json({ message: err.message });
        }
    },

    getLikedPokemonByUserId: async(req, res) => {
        try {
            if(!req.user.admin)
                return res.status(403).json({ message: 'Action Denied'})

            let actualLiked = await User.findOne({ _id: req.params.id }).select('fav-pkmn');

            let favPkmn = await Pokemon.find({ name: { $in: actualLiked['fav-pkmn'] } })

            return res.status(200).json({ data: favPkmn });
        }
        catch(err) {
            return res.status(400).json({ message: err.message });
        }
    }

}

module.exports = UserController;