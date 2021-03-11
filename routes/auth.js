/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, validarGoogleSignIn, renewToken} = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',
[
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'el email debe de ser xxxx@xxxx.xxx').isEmail(),
    validarCampos
],
login
)

router.post('/google',
[
    check('token', 'token google obligatorio').not().isEmpty(),
    validarCampos
],
validarGoogleSignIn
)

router.get('/renew',
validarJWT,
renewToken
)



module.exports = router;