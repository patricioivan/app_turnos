const mongoose = require('mongoose');

const connectionUri = () => {
    if (!process.env.DB_CONNECTION_URI) {
        throw new Error('ERROR: MISSING DB_CONNECTION_URI');
    }
    return process.env.DB_CONNECTION_URI;
};

module.exports = async () => {
    await mongoose
        .connect(connectionUri(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => {
            console.log(`Error connecting to MongoDB: ${err}`);
            process.exit(1);
        });
};

module.exports.connectionUri = connectionUri();
