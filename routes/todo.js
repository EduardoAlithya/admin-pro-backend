/*
    Path: '/api/todo'
*/

const { Router } = require('express');
const { getBusqueda, getCollectionTabla } = require('../controller/todo');
const { validarJWT } = require('../middlewares/validate-jwt');

const router = Router();
console.log('route: todo');

router.get('/:busqueda', validarJWT ,
getBusqueda
)

router.get('/collection/:tabla/:busqueda', validarJWT ,
getCollectionTabla
)



module.exports = router;