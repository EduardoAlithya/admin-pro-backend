/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
[
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'el email debe de ser xxxx@xxxx.xxx').isEmail(),
    validarCampos
],
login
)



module.exports = router;