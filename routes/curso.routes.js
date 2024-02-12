const { Router } = require ('express');
const {check} = require ('express-validator');

const {validarCampos} = require ('../middlewares/validar-campos');
const {cursosPost} = require('../controllers/curso.controller');
const router = Router ();

router.post(
    "/",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("descripcion","La descripcion es obligatoria").not().isEmpty(),
        check("docente","El docente es obligatorio").not().isEmpty(),
        check("duracion","La duracion es obligatoria").not().isEmpty(),
        check("categoria","La categoria es obligatoria").not().isEmpty(),
        check("precio","El precio es obligatorio").not().isEmpty(),
        validarCampos,
    ],cursosPost);

    module.exports = router;
