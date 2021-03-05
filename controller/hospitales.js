const { response } = require("express");
const Hospital = require('../model/hospital');

const getHospitales = async(req, res = response) => {
    console.log('llamada a crearHospitales');
    const desde = Number( req.query.desde ) || 0;
    try {
/*     const hospitales = await Hospital.find()
                            .populate('usuario', 'nombre')
                            .skip( desde )
                            .limit( 5 )

        const total = await Hospital.count(); */
        const [ hospitales, total ] = await Promise.all ([
            Hospital.find()
            .populate('usuario', 'nombre')
            .skip( desde )
            .limit( 5 ),
            Hospital.count()
            
        ]);

        res.status(200).json({
            ok: true,
            hospitales,
            total
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs : " + error 
        })
    }
}

const crearHospitales = async(req, res = response) => {
    console.log('llamada a crearHospitales');

    const uid = req.uid;
    console.log(uid);
    const hospital = new Hospital({
        usuario: req.uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error tecnico sirvase revisar el logs" + error
        })
    }
}

const actualizarHospitales = async(req, res = response) => {
    console.log('llamada a crearHospitales');
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

const borrarHospitales = async(req, res = response) => {
    console.log('llamada a crearHospitales');
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
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}