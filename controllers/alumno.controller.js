const {response, json} = require('express');
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
                    path: 'cursos', // Nombre del campo en el modelo Alumno que contiene el ID del curso
                    model: 'Curso', // Nombre del modelo de cursos (debe coincidir con el nombre que usaste al definir el modelo)
                    select: 'nombre' // Campos del curso que deseas mostrar
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



const getalumnosById = async (req, res) =>{
    const {id} = req.params;
    const alumno = await Alumno.findOne({_id:id});

    res.status(200).json({
        alumno
    });
}


const alumnoPost = async (req, res) => {
    try {
        const { nombre, apellido, edad, direccion, email, telefono, cursoId } = req.body;

        // Verificar si el curso existe
        const curso = await Curso.findById(cursoId);
        if (!curso) {
            return res.status(404).json({ message: 'El curso no existe' });
        }

        // Crear un nuevo alumno y asociarlo con el curso
        const alumno = new Alumno({ nombre, apellido, edad, direccion, email, telefono });
        alumno.cursos.push(curso); // Agregar el curso al array de cursos del alumno

        // Guardar el alumno en la base de datos
        await alumno.save();

        res.status(200).json({ alumno });
    } catch (error) {
        console.error('Error al crear el alumno:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}

module.exports = {
    alumnosGet,
    getalumnosById,
    alumnoPost
}

