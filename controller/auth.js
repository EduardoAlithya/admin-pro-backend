const { response } = require('express');
const Usuario = require('../model/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

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


module.exports = {
    login
}