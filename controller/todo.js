const { response } = require("express");
const Usuario = require('../model/usuario');
const Hospital = require('../model/hospital');
const Medico = require('../model/medico');

const getBusqueda = async(req, res = response) => {
    console.log('llamada a get Busqueda');

    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda, 'i');

    const [ usuarios, medicos, hospitales ] = await Promise.all ([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);
   

    try {
        console.log(busqueda);
        res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs"
        })
    }
}

const getCollectionTabla = async(req, res = response) => {
    console.log('llamada a getCollectionTabla');

    const busqueda = req.params.busqueda
    const tabla = req.params.tabla
    const regex = new RegExp(busqueda, 'i');
    let data = [];
   

    try {
        switch (tabla) {
            case 'usuarios':
                data = await Usuario.find({ nombre: regex })
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                            .populate('usuario', 'nombre img')
                break;
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                            .populate('usuario', 'nombre img')
                            .populate('hospital', 'nombre img')
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: "tabla debe ser usuarios, medicos u hospitales"
                })
        }

        res.status(200).json({
            ok: true,
            resultado: data
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs"
        })
    }
}



module.exports = {
    getBusqueda,
    getCollectionTabla
}