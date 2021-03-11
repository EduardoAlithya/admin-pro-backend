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
    const uid = req.uid;
    const id = req.params.id;
        console.log(id);
        console.log(uid);

    const medicoDB = await Medico.findById({_id: id});

    if ( !medicoDB ) {
        res.status(404).json(
            {
                ok: false,
                msg: 'no existe medico asociado a esa id'
            }
        )
    }

    const modificaMedico = {
        usuario: req.uid,
        ...req.body,
 
    }

    const medicoModificado = await Medico.findByIdAndUpdate(id, modificaMedico, { new: true});

    try {
        res.status(200).json({
            ok: true,
            msg: "medico modificado",
            medicoModificado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs"
        })
    }
}

const borrarMedicos = async(req, res = response) => {
    console.log('llamada a borrarMedicos');
    const  uid = req.params.id;

    try {
        const medicoDb = await Medico.findOne({ _id: uid });
        if ( !medicoDb ) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: " No existe un Medico para esa id"
                });
        }

        const medicoBorrado = await Medico.findByIdAndRemove( uid );

        res.json({
            ok: true,
            msg: 'Medico ha sido borrado exitosamente',
            usuario: medicoBorrado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error tecnico sirvase revisar el logs: " + error
        })
    }
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}