const { Router } = require ('express');
const {check} = require ('express-validator');
const {existeCursoById} = require ('../helpers/db-validators');
const {validarCampos} = require ('../middlewares/validar-campos');
const {cursosPost,cursosGet,getcursoById, cursosPut,contactosDelete} = require('../controllers/curso.controller');
const router = Router ();

router.get("/", cursosGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ],getcursoById);

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

router.put(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ],cursosPut);

router.delete(
    "/:id",
    [
        check("id","El id no es un formato valido de mongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ],contactosDelete);

    module.exports = router;
