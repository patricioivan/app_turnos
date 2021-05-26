const helmet = require('helmet');
const cors = require('cors');
const express = require('express');

module.exports = (app) => {
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
};
