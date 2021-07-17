/* eslint-disable no-console */
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
};
