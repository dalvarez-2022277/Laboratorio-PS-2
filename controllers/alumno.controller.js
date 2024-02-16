const { response, json } = require('express');
const Alumno = require('../models/alumno');
const Curso = require('../models/curso');

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


const alumnoPost = async (req, res) => {
    try {
        const { nombre, apellido, edad, direccion, email, telefono, cursoId } = req.body;
        let alumno = await Alumno.findOne({ email }); // Buscar el alumno por su email

        if (!alumno) {
            // Si el alumno no existe, se crea uno nuevo
            alumno = new Alumno({ nombre, apellido, edad, direccion, email, telefono });
        }

        const curso = await Curso.findById(cursoId);

        if (!curso) {
            return res.status(404).json({ message: 'El curso no existe' });
        }

        // Verificar si el curso ya está asociado al alumno
        if (alumno.cursos.includes(cursoId)) {
            return res.status(400).json({ message: 'El curso ya está asociado al alumno' });
        }

        alumno.cursos.push(curso);
        await alumno.save();

        res.status(200).json({ alumno });
    } catch (error) {
        console.error('Error al crear el alumno:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}


const alumnoPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    await Alumno.findByIdAndUpdate(id, resto);

    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        msg: 'El alumno fue actualizado exitosamente',
        alumno
    });

}

const alumnoDelete = async (req, res) => {
    const {id} = req.params;
    await Alumno.findByIdAndUpdate(id, { estado: false });
    const alumno = await Alumno.findOne({_id:id});

    res.status(200).json({
        msg:"Alumno Eliminado exitosamente",
        alumno
    });
}

module.exports = {
    alumnosGet,
    getalumnosById,
    alumnoPost,
    alumnoPut,
    alumnoDelete
}

