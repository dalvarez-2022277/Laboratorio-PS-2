const { Router } = require ('express');
const {check} = require ('express-validator');
const {existeAlumnoById} = require ('../helpers/db-validators');
const {validarCampos} = require ('../middlewares/validar-campos');
const {alumnosGet,getalumnosById,alumnoPost} = require ('../controllers/alumno.controller');

const router = Router();

router.get('/', alumnosGet)

router.get (
    '/:id',
    [
        check('id','El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existeAlumnoById),
        validarCampos
    ],getalumnosById);

router.post(
    '/',
    [

        validarCampos
    ],alumnoPost);

    module.exports = router;