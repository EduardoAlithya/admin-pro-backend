const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { actualizarImagen } = require("../helper/actualizar-imagen");

const uploadFile = async(req, res = response) => {
    console.log('llamada a uploadFile');

    const tipo = req.params.tipo
    const id = req.params.id;

    try {

        const tiposValidos = ['usuarios', 'hospitales', 'medicos'];

        if (! tiposValidos.includes(tipo)) {
             res.status(400).json({
                 ok:false,
                 msg: "tipo debe estar ser : usuarios, hospitales o medicos"
             })
        }
     
        //Validar que exista un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
         return res.status(400).json({
             ok:false,
             msg: 'No files were uploaded.'
         });
       }
     
       //Procesar la imagen
     
       const file = req.files.imagen;
       const nombreCortado = file.name.split('.');
       const extensionArchivo = nombreCortado[nombreCortado.length - 1];
     
       //validar extension 
     
       const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'];
     
       if (! extensionesValidas.includes(extensionArchivo)) {
         res.status(400).json({
             ok:false,
             msg: "extension no admitida"
         })
     }
     
     // generar el nombre del archivo
     
     const archivo = `${uuidv4()}.${extensionArchivo}`;
     
     // path donse guardar la imagen
     
     const path = `./uploads/${tipo}/${archivo}`;
     
     file.mv(path, function(err) {
         if (err)
           return res.status(500).json({
               ok: false,
               msg: 'log error : ' + err
           });

            actualizarImagen(tipo, id, archivo);
     
           res.status(200).json({
             ok: true,
             msg: 'file uploaded',
             archivo
         })
       });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs: " + error
        })
    }
}

const getFile = async(req, res = response) => {

    const tipo = req.params.tipo;
    const idImage = req.params.img;

    const pathImage = path.join(__dirname, `../uploads/${ tipo }/${ idImage }`);
    const pathNoImage = path.join(__dirname, '../res/no-imagen.png');


    res.sendFile(fs.existsSync(pathImage) ?  pathImage  :  pathNoImage );

    
}




module.exports = {
    uploadFile,
    getFile
}