const { response, json } = require('express');
const byscrypt = require('bcryptjs');
const Alumno = require('../models/alumno');
const Curso = require('../models/curso');
const jwt = require('jsonwebtoken');

const alumnosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, alumnos] = await Promise.all([
            Alumno.countDocuments(query),
            Alumno.find(query)
                .populate({
                    path: 'cursos',
                    model: 'Curso',
                    select: '-_id nombre descripcion docente duracion categoria precio' // Excluye el campo _id y selecciona todos los demás campos del curso
                })
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            alumnos,
        });
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}



const getalumnosById = async (req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        alumno
    });
}


const bcrypt = require('bcryptjs');

const alumnoPost = async (req, res) => {
    try {
        var { nombre, correo, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const alumno = new Alumno({ nombre, correo, password: hashedPassword });
        await alumno.save();

        res.status(200).json({ alumno });
    } catch (error) {
        console.error("Error al guardar alumno:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
}


const asignarcursoalumno = async (req, res) => {
    try {
        const { curso } = req.body;
        const token = global.tokenAcces;
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const alumno = await Alumno.findById(uid);
        if (!alumno) {
            return res.status(404).json({ msg: "Estudiante no encontrado" });
        }

        const cursoExistente = await Curse.findOne({ nombre: curso, estado: true });
        if (!cursoExistente) {
            return res.status(400).json({ msg: "El curso no existe" });
        }

        if (alumno.cursos.includes(curso)) {
            return res.status(400).json({ msg: "Ya te encuentras asignado a ese curso" });
        }

        if (alumno.cursos.length >= 3) {
            return res.status(400).json({ msg: "Ya estás asignado a 3 cursos, no puedes asignarte más" });
        }

        await Alumno.findByIdAndUpdate(uid, { $push: { cursos: curso } });
        res.status(200).json({ msg: "Curso asignado exitosamente" });
    } catch (error) {
        console.error("Error al asignar curso:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
}


const alumnoPut = async (req, res) => {
    try {
        const { nombre, password } = req.body;
        const token = global.tokenAcces;
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const hashedPassword = await bcrypt.hash(password, 10);
        await Student.findByIdAndUpdate(uid, { nombre, password: hashedPassword });

        res.status(200).json({
            msg: "Actualizado exitosamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al actualizar el alumno"
        });
    }
}
module.exports = {
    alumnoPut
};


const alumnoDelete = async (req, res) => {
    const { id } = req.params;
    await Alumno.findByIdAndUpdate(id, { estado: false });
    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        msg: "Alumno Eliminado exitosamente",
        alumno
    });
}

module.exports = {
    alumnosGet,
    getalumnosById,
    alumnoPost,
    alumnoPut,
    alumnoDelete,
    asignarcursoalumno
}

