const {response} = require('express');
const bcrypt = require('bcryptjs');
const Alumno = require('../models/alumno');

const alumnoExist = async (correo = '') => {
    const correoEXist = await Alumno.findOne({correo});
    if(correoEXist){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

module.exports={
    alumnoExist
}