const { Schema, model } = require('mongoose');

const CursosSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la asignatura es obligatorio']
    },

    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },

    docente: {
        type: String,
        required: [true, 'El docente es obligatorio']
    },

    duracion: {
        type: String,
        required: [true, 'La duracion es obligatoria']
    },

    categoria: {
        type: String,
        required: [true, 'La categotia es obligatoria']
    },

    precio: {
        type: String,
        required: [true, 'El precio es obligatorio']
    },

    estado: {
        type: Boolean,
        default: true
    }

});


module.exports = model('Curso', CursosSchema);