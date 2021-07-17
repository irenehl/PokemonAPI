const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Strategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const User = require('../models/UserModel');

module.exports = () => {
    passport.use(new Strategy(async (username, password, cb) => {
        const user = await User.findOne({ username });

        if (!user) {
            return cb(null, false);
        }

        const verified = await bcrypt.compare(password, user.password);

        if (!verified) {
            return cb(null, false);
        }

        return cb(null, user);
    }));

    passport.use(new BearerStrategy((token, cb) => {
        const user = jwt.verify(token, process.env.TOKEN_KEY);

        if (!user) {
            return cb(null, false);
        }

        return cb(null, user);
    }));
};
