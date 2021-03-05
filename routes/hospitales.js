/*
    Path: '/api/hospitales'
*/


const  { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require('../controller/hospitales') 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');



router.get( '/', getHospitales );

router.post('/', validarJWT, 
[
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
], crearHospitales);

router.put( '/:id',
[
    validarCampos,
],
actualizarHospitales );

router.delete( '/:id', borrarHospitales);

module.exports = router;