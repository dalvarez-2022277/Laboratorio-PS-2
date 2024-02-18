const {Schema, model} = require('mongoose');
const cursos = require('./curso');

const ProfesorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    edad: {
        type: String,
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
    role:{
        type: String,
        required: true,
        default: '“TEACHER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    cursos: [{ type: Schema.Types.ObjectId, ref: 'cursos' }]
}); 

module.exports = model('Profesor', ProfesorSchema);