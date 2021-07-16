
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/UserModel');
const Strategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');

module.exports = function () {
    passport.use(new Strategy(async function(username, password, cb) {
        let user = await User.findOne({ username: username });

        if (!user) { 
            return cb(null, false);
        }

        let verified = await bcrypt.compare(password, user.password);

        if (!verified) {
            return cb(null, false);
        }

        return cb(null, user);
    }));

    passport.use(new BearerStrategy(function(token, cb) {
        let user = jwt.verify(token, process.env.TOKEN_KEY)

        if(!user) {
            return cb(null, false);
        }

        return cb(null, user);
    }));
}