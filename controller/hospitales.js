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
            Hospital.countDocuments()
            
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

const actualizarHospitales = async(req, res = response) => {
    console.log('llamada a actualizarrHospitales');


    try {
        const uid = req.uid;
        const id = req.params.id;
        console.log(id);
        console.log(uid);
        const hospitalDB = await Hospital.findById({ _id: id });

        if ( !hospitalDB ) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: " No existe un hospital para esa id"
                });
        }



         const cambioHospital = {
             ...req.body,
             usuario: uid
         }

         const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambioHospital, {new: true});
         
        res.status(200).json({
            ok: true,
            msg: 'actualizar hospital',
            hospitalDB
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

const borrarHospitales = async(req, res = response) => {
    console.log('llamada a borrarHospitales');
    const  uid = req.params.id;

    try {
        const hospitalDB = await Hospital.findOne({ _id: uid });
        if ( !hospitalDB ) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: " No existe un hospital para esa id"
                });
        }

        const hospitalBorrado = await Hospital.findByIdAndRemove( uid );

        res.json({
            ok: true,
            usuario: hospitalBorrado
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