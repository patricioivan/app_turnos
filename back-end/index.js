const express = require('express');
require('express-async-errors');

const app = express();

require('./startup/jwt_key_verification')();
require('./startup/security')(app);
require('./startup/db')();
require('./startup/error_log')();
require('./startup/routes')(app);
require('./startup/seed_admins')();
require('./startup/joi_initialization')();

require('./cron_functions/crons')();

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
