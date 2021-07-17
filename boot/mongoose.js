const logger = require('morgan');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            logger('Connected to DB');
        })
        .catch((err) => {
            logger(err);
            process.exit(1);
        });
};
