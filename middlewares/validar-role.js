const jwt = require('jsonwebtoken');
const Alumno = require('../models/alumno');

const validarAlumno = async (req, res, next) => {
    const token = global.tokenAcces;
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const alumno = await Alumno.findById(uid);
        if (!alumno) {
            return res.status(404).json({ msg: "Estudiante no encontrado" });
        }
    } catch (e) {
        return res.status(401).json({ msg: "Comuniquese con el admin" });
    }
    next();
}

module.exports = {
    validarAlumno
}