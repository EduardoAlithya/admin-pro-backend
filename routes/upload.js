/*
    Path: '/api/upload'
*/

const { Router } = require('express');
const expressFileupload = require('express-fileupload');
const { uploadFile, getFile } = require('../controller/upload');
const { validarJWT } = require('../middlewares/validate-jwt');

const router = Router();
router.use( expressFileupload() );
console.log('route: upload');

router.put('/:tipo/:id', validarJWT ,
uploadFile
)
router.get('/:tipo/:img',
getFile
)


module.exports = router;