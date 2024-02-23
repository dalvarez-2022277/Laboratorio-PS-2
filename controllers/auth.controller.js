const { generarJWT } = require('../helpers/generar-jwt');
const Alumno = require('../models/alumno');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const alumno = await Alumno.findOne({ correo });
        console.log(alumno)
        if (!alumno) {
            return res.status(400).json({
                msg: 'Usuario / el correo no esta registrado'
            });
        }
        if (!alumno.estado) {
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            });
        }
        const validPassword = bcrypt.compareSync(password, alumno.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await generarJWT(alumno.id);

        res.status(200).json({
            msg:'Logeado correctamente',
            alumno,
            token
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'Comunicarse con el admin'
        });
    }
};

module.exports = {
    login
};