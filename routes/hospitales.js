/*
    Path: '/api/hospitales'
*/


const  { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require('../controller/hospitales') 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');



router.get( '/',validarJWT,  getHospitales );
router.put( '/:id',
            validarJWT,
            actualizarHospitales
);

router.post('/', validarJWT, 
[
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
], crearHospitales);

router.put( '/:id',
[
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos,
],
actualizarHospitales );

router.delete( '/:id', validarJWT, borrarHospitales);


module.exports = router;