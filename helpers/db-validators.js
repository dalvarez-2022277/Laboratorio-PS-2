const Curso = require('../models/curso');
const Alumno = require('../models/alumno');


const existeCursoById = async (id='')=>{
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`El usuario con el ${id} no existe`);
    }
}

const existeAlumnoById = async (id='')=>{
    const existeAlumno = await  Alumno.findOne({id});
    if(existeAlumno){
        throw new Error(`El usuario con el ${id} no existe`);
    }
}

module.exports = {
    existeCursoById,
    existeAlumnoById
}