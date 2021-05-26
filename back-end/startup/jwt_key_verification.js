module.exports = function () {
    if (!process.env.JWT_PRIVATE_KEY) {
        throw new Error('FATAL ERROR: JWT PRIVATE KEY NOT DEFINED');
    }
};
