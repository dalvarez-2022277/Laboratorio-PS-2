const jwt = require('jsonwebtoken');
const Alumno = require('../models/alumno');

const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {   
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const alumno = await Alumno.findById(uid);

        if (!alumno) {
            return res.status(401).json({
                msg: "Token no válido - alumno no existe en DB",
            });
        }

        if (!alumno.estado) {
            return res.status(401).json({
                msg: "Token no válido - alumno con estado: false",
            });
        }

        req.alumno = alumno;

        metxt();
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};

module.exports = {
    validarJWT,
};