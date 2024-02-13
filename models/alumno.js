const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    edad: {
        type: Number,
        required: [true, 'La edad es obligatoria']
    },

    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },

    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },

    fechaInscripcion: {
        type: Date,
        default: Date.now
    },

    estado: {
        type: Boolean,
        default: true
    }

});

module.exports = model('Alumno', AlumnoSchema);
