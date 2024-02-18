const { Router } = require('express');
const { check } = require('express-validator');
const { existeProfesorById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { profesorGet, getprofesorById, profesorPost, profesorPut, profesorDelete } = require('../controllers/profesor.controller');

const router = Router();

router.get('/', profesorGet);

router.get(
    '/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existeProfesorById),
        validarCampos
    ],getprofesorById);

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
], profesorPost);

router.put('/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existeProfesorById),
        validarCampos
    ], profesorPut);

router.delete('/:id',
    [
        check('id', 'El id no es un formato valido de mongoDB').isMongoId(),
        check('id').custom(existeProfesorById),
        validarCampos
    ], profesorDelete);

        module.exports = router;