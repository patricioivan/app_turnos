const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    empresa: new mongoose.Schema({
    }),
    nombre: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true,
        index: true,
    },
    rubros: [
        new mongoose.Schema({
            nombre: {
                type: String,
                maxlength: 255,
                trim: true,
                required: true,
            },
        }),
    ],
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
});

schema.index({ location: '2dsphere' });

schema.methods.hateoas = function (req) {
    if (this instanceof mongoose.Document) {
        const newNegocio = this.toJSON();
        newNegocio.links = {};
        newNegocio.links.ver = `${req.headers.host}/api/negocios/${this._id}`;
        newNegocio.links.datosYHorarios = `${req.headers.host}/api/negocios/${this._id}/horarios`;
        return newNegocio;
    }
    return false;
};

const Negocio = mongoose.model('Negocio', schema);

module.exports = Negocio;
