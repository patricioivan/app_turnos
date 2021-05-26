const winston = require('winston');
require('winston-mongodb');
const { connectionUri } = require('./db');

const mongoTransport = new winston.transports.MongoDB({
    db: connectionUri,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    level: 'error',
});

const logger = winston.createLogger({
    transports: [
        mongoTransport,
    ],
    exceptionHandlers: [
        mongoTransport,
    ],
});

module.exports = () => {
    process.on('uncaughtException', (err) => {
        logger.error(err.message, err);
        console.log(err);
    });

    process.on('unhandledRejection', (err) => {
        logger.error(err.message, err);
        console.log(err);
    });
};

module.exports.logger = logger;
