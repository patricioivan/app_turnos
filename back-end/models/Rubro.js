const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nombre: {
        type: String,
        maxlength: 255,
        trim: true,
        index: true,
        required: true,
    },
    negocios: [
        new mongoose.Schema({
            empresa: new mongoose.Schema({
            }),
            nombre: {
                type: String,
                maxlength: 255,
                trim: true,
                required: true,
                index: true,
            },
            imagen: {
                type: String,
                trim: true,
            },
            direccion: {
                provincia: {
                    type: String,
                    maxlength: 255,
                    trim: true,
                    required: true,
                },
                localidad: {
                    type: String,
                    maxlength: 255,
                    trim: true,
                    required: true,
                },
                calle: {
                    type: String,
                    maxlength: 255,
                    trim: true,
                    required: true,
                },
                numero: {
                    type: Number,
                    maxlength: 255,
                    trim: true,
                    required: true,
                },
                departamento: {
                    type: String,
                    maxlength: 255,
                    default: '',
                    trim: true,
                    required: false,
                },
            },
            location: {
                type: {
                    type: String,
                    enum: ['Point'],
                    default: 'Point',
                    required: true,
                },
                coordinates: {
                    type: [Number],
                    required: true,
                },
            },
            calificacion: {
                cantidadOpiniones: {
                    type: Number,
                    default: 0,
                    required: true,
                },
                cantidadPuntos: {
                    type: Number,
                    default: 0,
                    required: true,
                },
                promedio: {
                    type: Number,
                    default: 0,
                    required: true,
                },
            },
            abierto: {
                type: Boolean,
                default: true,
                required: true,
            },
        }),
    ],
});

schema.methods.hateoas = function (req) {
    const newRubro = this.toJSON();
    newRubro.links = {};
    newRubro.links.negocios = `${req.headers.host}/api/rubros/${this._id}/negocios`;
    newRubro.links.buscar = `${req.headers.host}/api/rubros/${this._id}/negocios/buscar`;
    return newRubro;
};

const Rubro = mongoose.model('Rubro', schema);

module.exports = Rubro;
