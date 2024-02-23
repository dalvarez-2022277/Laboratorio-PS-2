const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'ALUMNO_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    cursos: {
        type: Array,
        default: 'NONE'
    }
});

AlumnoSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Alumno', AlumnoSchema);
