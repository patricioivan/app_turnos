const bcrypt = require('bcryptjs');
const Soporte = require('../models/Soporte');

module.exports = async () => {
    let soporte = await Soporte.findOne({ email: 'facundomoreno1605@gmail.com' });
    if (!soporte) {
        await Soporte.create({
            nombre: 'Facundo',
            apellido: 'Moreno',
            documento: '41143714',
            celular: '03815081705',
            email: 'facundomoreno1605@gmail.com',
            password: await bcrypt.hash('12345678', 10),
            admin: true,
        });

        console.log('Admin agregado: Facundo Moreno');
    }

    soporte = await Soporte.findOne({ email: 'patricioivan1997@gmail.com' });
    if (!soporte) {
        Soporte.create({
            nombre: 'Patricio',
            apellido: 'Ivan',
            documento: '40000000',
            celular: '03815081706',
            email: 'patricioivan1997@gmail.com',
            password: await bcrypt.hash('12345678', 10),
            admin: true,
        });

        console.log('Admin agregado: Patricio Ivan');
    }
};
