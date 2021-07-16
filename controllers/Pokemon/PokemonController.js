const Pokemon = require('../../models/PokemonModel');
const { createPokemon, modifyPokemon } = require('./PokemonValidator')

const PokemonController = {
    create: async(req, res) => {
        try {
            if(req.user.admin == false)
                return res.status(403).json({ message: 'Action Denied'})

            await createPokemon(req.body)

            let newPokemon = new Pokemon({ 
                name: req.body.name,
                description: req.body.description,
                dateReleased: req.body.dateReleased,
                type: req.body.type,
                // pending image
            })

            await newPokemon.save()
            
            return res.status(201).json({ message: 'Created successfully' })
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    },

    modifyPokemon: async(req, res) => {
        try {
            if(req.user.admin == false)
                return res.status(403).json({ message: 'Action Denied'})
            
            var actualPokemon = await Pokemon.findOne({ name: req.body.name })
            const updateConflict = await Pokemon.findOne({ name: req.body.name })

            if(updateConflict)
                throw {error: true, message: "This pokemon already exits"}
            else if(!actualProduct)
                throw {error: true, message: "Product not found"}

            
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    },
    removePokemon: async(req, res) => {
        try {

        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    },
    getAllPokemon: async(req, res) => {
        try {

        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    },
    
}

module.exports = PokemonController