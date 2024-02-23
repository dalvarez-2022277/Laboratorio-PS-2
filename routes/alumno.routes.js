const { Router } = require('express');
const { check } = require('express-validator');
const { existeAlumnoById } = require('../helpers/db-validators');
const { existeAlumno } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { alumnosGet, getalumnosById, alumnoPost, alumnoPut, alumnoDelete, asignarcursoalumno } = require('../controllers/alumno.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarAlumno } = require('../middlewares/validar-role');

const router = Router();

router.get('/', alumnosGet)

router.get(
    '/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existeAlumnoById),
        validarCampos
    ], getalumnosById);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("correo", "El correo es obligatorio").not().isEmpty(),
        check('password').isLength({ min: 6 }),
        check('correo').custom(existeAlumno),
        validarCampos
    ], alumnoPost);

router.put(
    '/:id',
    [
        validarJWT,
        check('curso').not().isEmpty(),
        validarAlumno,
        validarCampos
    ], asignarcursoalumno);

router.put(
    '/:id',
    [
        validarJWT,
        validarAlumno,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check('password').isLength({ min: 6 }),
        validarCampos
    ], alumnoPut
);

router.delete(
    '/:id',
    [
        validarJWT,
        validarAlumno,
        check("password").not().isEmpty(),
        validarCampos
    ], alumnoDelete
);
module.exports = router;