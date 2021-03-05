/*
    Path: '/api/medicos'
*/


const  { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controller/Medicos') 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');



router.get( '/', getMedicos );

router.post('/', validarJWT, 
[
    check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'id de hospital no es MongoId valida').isMongoId(),
    validarCampos,
], crearMedicos);

router.put( '/:id',
[

    validarCampos,
],
actualizarMedicos );

router.delete( '/:id', borrarMedicos);

module.exports = router;