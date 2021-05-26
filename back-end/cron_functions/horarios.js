const { CronJob } = require('cron');
const moment = require('moment-timezone');
const Horario = require('../models/Horario');


module.exports = function () {
    // @desc Limpia los horarios completos al inicio del dia
    // eslint-disable-next-line no-new
    new CronJob('00 00 00 * * *', async () => {
        const horarios = await Horario.find({
            completo: true,
            dia: moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('dddd'),
        });

        if (horarios.length > 0) {
            horarios.forEach(async (horario) => {
                // eslint-disable-next-line no-param-reassign
                horario.completo = false;
                await horario.save();
            });
        }

        return true;
    }, null, true, 'America/Argentina/Buenos_Aires');
};
