const  { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controller/usuarios') 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');



router.get( '/', validarJWT, getUsuarios );

router.post('/',  
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'el email debe de ser xxxx@xxxx.xxx').isEmail(),
    validarCampos,
], crearUsuarios);

router.put( '/:id',
[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email debe de ser xxxx@xxxx.xxx').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
],
actualizarUsuario );

router.delete( '/:id', validarJWT, borrarUsuario);

module.exports = router;