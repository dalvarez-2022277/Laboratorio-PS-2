const { response, json } = require('express');
const Profesor = require('../models/profesor');
const Curso = require('../models/curso');


const profesorGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    try {
        const [total, profesores] = await Promise.all([
            Profesor.countDocuments(query),
            Profesor.find(query)
                .populate({
                    path: 'cursos',
                    model: 'Curso',
                    select: '-_id nombre descripcion docente duracion categoria precio'
                })
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        res.status(200).json({
            total,
            profesores
        });
    } catch(e){
        console.error('Error al obtener los profesores:', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const getprofesorById = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findOne({ _id: id });
    res.status(200).json({
        profesor
    });
};


const profesorPost = async (req, res) => {
    try {
        const { nombre, apellido, edad, direccion, email, telefono, cursoId } = req.body;
        let profesor = await Profesor.findOne({ email });

        if (!profesor) {
            profesor = new Profesor({ nombre, apellido, edad, direccion, email, telefono });
        }

        const curso = await Curso.findById(cursoId);

        if (!curso) {
            return res.status(404).json({ message: 'El curso no existe' });
        }

        if (profesor.cursos.includes(cursoId)) {
            return res.status(400).json({ message: 'El curso ya está asociado al profesor' });
        }

        profesor.cursos.push(curso);
        await profesor.save();

        res.status(200).json({ profesor });
    } catch (e) {
        console.error('Error al crear el profesor:', e);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

const profesorPut = async (req, res) => {
    const {id} = req.params;
    const {_id, estado, cursos, ...resto} = req.body;
    await Profesor.findByIdAndUpdate(id, resto);
    const profesor = await Profesor.findOne({ _id: id });

    res.status(200).json({
        msg: 'Profesor actualizado',
        profesor
    });
}

const profesorDelete = async (req, res) => {
    const {id} = req.params;
    await Profesor.findByIdAndUpdate(id, {estado: false});
    const alumno = await Profesor.findOne({_id:id});

    res.status(200).json({
        msg: 'Profesor eliminado',
        alumno
    }); 
}

module.exports = {
    profesorPost,
    profesorGet,
    getprofesorById,
    profesorPut,
    profesorDelete
}