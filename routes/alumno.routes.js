const { Router } = require('express');
const { check } = require('express-validator');
const { existeAlumnoById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { alumnosGet, getalumnosById, alumnoPost, alumnoPut,alumnoDelete } = require('../controllers/alumno.controller');

const router = Router();

router.get('/', alumnosGet)

router.get(
    '/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existeAlumnoById),
        validarCampos
    ], getalumnosById);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('cursoId', 'El id del curso no es un formato valido de MongoDB').isMongoId(),
    check('cursoId', 'Debe asignarse al menos un curso').not().isEmpty(),
    validarCampos
], alumnoPost);

router.put(
    '/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('id').custom(existeAlumnoById),
        validarCampos
    ], alumnoPut);

    router .delete(
        '/:id',
        [
            check('id', 'El id no es un formato valido de mongoDB').isMongoId(),
            check('id').custom(existeAlumnoById),
            validarCampos
        ], alumnoDelete);
    module.exports = router;