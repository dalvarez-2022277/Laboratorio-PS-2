const { response, json } = require('express');
const Curso = require('../models/curso');

const cursosPost = async (req, res) => {
    const { nombre, descripcion, docente, duracion, categoria, precio} = req.body;
    const curso = new Curso({ nombre, descripcion, docente, duracion, categoria, precio})
    await curso.save();
    res.status(200).json({
        curso
    });
}

module.exports = {
    cursosPost
}