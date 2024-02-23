const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth.controller');
const router = Router();

router.get(
    "/login",
    [
        check("correo", "Ingrese un correo valido").isEmail(),
        check("password").not().isEmpty(),
        validarCampos
    ], login
);

module.exports = router;