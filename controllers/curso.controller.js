const { response, json } = require('express');
const Curso = require('../models/curso');


const cursosGet = async (req, res = response ) => {
    const {limite, desde} = req.query;
    const query = {estado:true};

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

const getcursoById = async (req, res) =>{
    const {id} = req.params;
    const curso = await Curso.findOne({_id:id});

    res.status(200).json({
        curso
    });
}

const cursosPut = async (req, res) => {
    const {id} = req.params;
    const {_id,...resto}=req.body;
    await Curso.findByIdAndUpdate(id,resto);

    const curso = await Curso.findOne({_id:id});

    res.status(200).json({
        msg:'El Curso fue actualizado exitosamente',
        curso
    })
}

const cursosPost = async (req, res) => {
    const { nombre, descripcion, docente, duracion, categoria, precio} = req.body;
    const curso = new Curso({ nombre, descripcion, docente, duracion, categoria, precio})
    await curso.save();
    res.status(200).json({
        curso
    });
}

const contactosDelete = async(req,res)=>{
    const{id} = req.params;
    await Curso.findByIdAndUpdate(id,{estado:false});
    const curso = await Curso.findOne({_id:id});

    res.status(200).json({
        msg:"Curso Eliminado exitosamente",
        curso
    });
}

module.exports = {
    cursosPost,
    cursosGet,
    getcursoById,
    cursosPut,
    contactosDelete
}