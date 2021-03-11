const { response } = require('express');
const Usuario = require('../model/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');
const { googleVerificar } = require('../helper/google-verificar');

const login = async(req, res = response) => {
    console.log("llamada a login");
    const { password, email } = req.body;
    try {

        const existeEmail = await Usuario.findOne({ email});

        if (!existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "error de credenciales"
            })
        }

        const validaPassword = bcryptjs.compareSync(password, existeEmail.password);
        console.log(validaPassword);

        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: "error de credenciales"
            })
        }

        const token = await generarJWT(existeEmail._id);


        res.status(200).json({
            ok: true,
            token : token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error tecnico revise el logs: ' + error
        })
    }
}

const validarGoogleSignIn = async(req, res = response) => {
    console.log("llamada a login google");
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerificar(googleToken);
        const usuarioDB = await Usuario.findOne({ email });

        let usuario = {};

        if (! usuarioDB ) {
            usuario = new Usuario ({
                nombre : name,
                email: email,
                img: picture,
                password: '***',
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario['google'] = true;
        }

        //save usuario

        usuario.save();

        // generate el Token -JWT

        const token = await generarJWT( usuario.id );

        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error tecnico revise el logs: ' + error
        })
    }
}

const renewToken = async(req, res = response) => {
    console.log("llamada a renew token");

    const uid = req.uid
    const token = await generarJWT(uid);

    try {
        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error tecnico revise el logs: ' + error
        })
    }
}
module.exports = {
    login,
    validarGoogleSignIn,
    renewToken
}