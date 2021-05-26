const Joi = require('@hapi/joi');

module.exports = function () {
    // eslint-disable-next-line global-require
    Joi.objectId = require('joi-objectid')(Joi);
};
