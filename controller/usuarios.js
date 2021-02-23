const Usuario = require('../model/usuario');
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

const getUsuarios = async(req, res) => {
    console.log('llamada a getUsuarios');
    const usuarios = await Usuario.find();

    res.json({
        ok: 'true',
        usuarios
    });
}

const crearUsuarios = async(req, res = response) => {
    console.log('llamada a crearUsuarios');
    const { email , password} = req.body;

    try {
       const existeEmail = await Usuario.findOne({ email});

       if (existeEmail) {
           res.status(400).json({
               ok: false,
               message: "email existente en la base de datos"
           })
       }

        const usuario = new Usuario(req.body);
        // encryptar contrasena 
        const salt = bcryptjs.genSaltSync(); 
        usuario.password = bcryptjs.hashSync(password, salt);

  

        await usuario.save();
        const token = await generarJWT(usuario._id);
        res.json({
            ok: 'true',
            usuario,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs"
        })
    }
}

const actualizarUsuario = async(req, res = response) => {
    console.log('llamada a actualizar usuario');
    const  uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findOne({ _id: uid });

        if ( !usuarioDB ) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: " No existe un usuario para esa id"
                });
        }

        //Actualizacion 

        const {password, google, email, ...campos} = req.body;

        if ( usuarioDB.email !== email ) {
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: "email ya existe en la Base de Datos"
                })
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true} );

      res.json({
          ok: true,
          usuario: usuarioActualizado
      })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs:" + error
        })
    }
}

const borrarUsuario = async(req, res = response) => {
    console.log('llamada a borrar usuario');
    const  uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findOne({ _id: uid });
        if ( !usuarioDB ) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: " No existe un usuario para esa id"
                });
        }

        const usuarioBorrado = await Usuario.findByIdAndRemove( uid );

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })


    } catch (error) {
            res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs:" + error
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}