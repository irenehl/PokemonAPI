# Pokemon API

## Summary 
[Description](#Description)\
[Installation](#Installation)\
[Environment](#Environment)\
[Entities/Schemas](#Entities)\
[Endpoints](#Endpoints)

## Description

This API was created in NodeJS. The API has: 
* User CRUD
* User roles
* Pokemon CRUD
* Fav and unfav Pokemon
* Upload image of Pokemon


## Installation

+ Read [dependencies](#Dependencies) section.
+ Clone repository.
+ Install every dependency run `npm install`
+ Create a *dotenv* file with the variables specified in [environment seccion](#Environment).
+ To test in development mode run `npm run dev` script.

## Dependencies

Listed on [package.json](https://github.com/irenehl/PokemonAPI/blob/master/package.json)


## Environment

The API needs the next enverionment variables. There are in a dotenv file

| Variable              |
|-----------------------|
| PORT                  |
| MONGO_URI             |
| TOKEN_KEY             |
| AWS_ACCESS_KEY_ID     |
| AWS_SECRET_ACCESS_KEY |

## Entities

The base of the API are ***User and Pokemon*** so, these are the schemas that are handled on mongoose

### User Schema

    const UserSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            required: true,
        },
        'fav-pkmn': [String],
    });

    
### Pokemon Schema

    const PokemonSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: String,
        dateReleased: Date,
        type: [String],
        image: String,
        pokedexNumber: {
            type: Number,
            unique: true,
        },
        ability: String,
        gender: {
            type: String,
            enum: ['male', 'female'],
            default: 'male',
        },
    });

## Endpoints

Endpoints are documented and handled in [Insomnia](https://support.insomnia.rest/) client, refer to [Insomnia JSON file](https://github.com/irenehl/PokemonAPI/blob/master/PokemonAPI.json) and import it to client.
