/* eslint-disable no-param-reassign */
const { CronJob } = require('cron');
const moment = require('moment-timezone');
const Turno = require('../models/Turno');

module.exports = function () {
    // @desc Expira todos los turnos sin usar al final del dia
    // eslint-disable-next-line no-new
    new CronJob('00 55 23 * * *', async () => {
        const hoy = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('DD/MM/YYYY');

        const turnos = await Turno.find({
            activo: true,
            fecha: hoy,
        });

        if (turnos.length > 0) {
            turnos.forEach(async (turno) => {
                turno.expirado = true;
                turno.activo = false;
                await turno.save();
            });
        }
        return true;
    }, null, true, 'America/Argentina/Buenos_Aires');
};
