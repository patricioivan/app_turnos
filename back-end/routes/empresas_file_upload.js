const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4 } = require('uuid');
const Negocio = require('../models/Negocio');
const Rubro = require('../models/Rubro');
const empresasMiddleware = require('../middleware/empresas');

const router = express.Router();

const s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: '',
});

const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '');
    },
});

const upload = multer({ storage }).single('image');

router.put('/:empresa/upload-imagen', [empresasMiddleware.recurso], upload, async (req, res) => {
    const { empresa } = req;

    const myFile = req.file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const params = {
        Bucket: 'unsta-tesis',
        Key: `${v4()}.${fileType}`,
        Body: req.file.buffer,
        ContentType: 'image/png',
    };

    s3.upload(params, async (error, data) => {
        if (error) {
            return res.status(500).send(error);
        }

        empresa.imagen = data.Location;
        await empresa.save();
        const negocios = await Negocio.find({ empresa });
        negocios.forEach(async (negocio) => {
            // eslint-disable-next-line no-param-reassign
            negocio.imagen = empresa.imagen;
            await negocio.save();

            const rubros = await Rubro.find();
            // eslint-disable-next-line no-restricted-syntax
            for (const rubro of rubros) {
                rubro.negocios.id(negocio._id).remove();
                rubro.negocios.push(negocio);
                rubro.save();
            }
        });

        return res.status(200).json({
            mensaje: 'Imagen guardada correctamente',
        });
    });
});

module.exports = router;
