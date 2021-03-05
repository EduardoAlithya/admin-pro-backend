const { response } = require("express");
const Medico = require('../model/medico');
const getMedicos = async(req, res = response) => {
    console.log('llamada a crearMedicos');
    const medicos = await Medico.find()
                          .populate('hospital', 'nombre')
                          .populate('usuario', 'nombre');  

    try {
        res.status(200).json({
            ok: true,
            medicos
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs"
        })
    }
}

const crearMedicos = async(req, res = response) => {
    console.log('llamada a crearMedicos');
    const uid = req.uid;
    console.log(uid);
    const medico = new Medicos({
        usuario: req.uid,
        ...req.body
    });

    try {
        const medicolDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico : medicolDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs : " + error
        })
    }
}

const actualizarMedicos = async(req, res = response) => {
    console.log('llamada a crearMedicos');
    const { nombre, usuario } = req.body;

    try {
        res.status(200).json({
            ok: true,
            msg: "hola mundo"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs"
        })
    }
}

const borrarMedicos = async(req, res = response) => {
    console.log('llamada a crearMedicos');
    const { nombre, usuario } = req.body;

    try {
        res.status(200).json({
            ok: true,
            msg: "hola mundo"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs"
        })
    }
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}