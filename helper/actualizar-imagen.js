const Usuario = require('../model/usuario');
const Medico = require('../model/medico');
const Hospital = require('../model/hospital');
const fs = require('fs');
const actualizarImagen = async (tipo, id, archivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico =  await Medico.findById(id);

            validaDocumento(medico);

            pathViejo = `./uploads/medicos/${ medico.img }`;

            validaSiExisteImagen(pathViejo);

            medico.img = archivo;

            await medico.save();

            return true;

        case 'usuarios':
            const usuario =  await Usuario.findById(id);

            validaDocumento(usuario);

            pathViejo = `./uploads/usuarios/${ usuario.img }`;

            validaSiExisteImagen(pathViejo);

            usuario.img = archivo;
            console.log('save image');
            await usuario.save();

            return true;

        case 'hospitales':
                const hospital =  await Hospital.findById(id);
    
                validaDocumento(hospital);
    
                pathViejo = `./uploads/hospitales/${ hospital.img }`;
    
                validaSiExisteImagen(pathViejo);
    
                hospital.img = archivo;
                console.log('save image');
                await hospital.save();
    
                return true;

        default:
            break;
    }
}

const validaDocumento = (documento) => {
    console.log('validaDocumento');
    if ( !documento ) {
        console.log( 'No es medico por id' );
        return false;
    }
}

const validaSiExisteImagen = (pathViejo) => {
    console.log('validaSiExisteImagen');
    if ( fs.existsSync ( pathViejo ) ) {
                
        // borrar la imagen anterior
        fs.unlinkSync( pathViejo );
    }
}

module.exports = {
    actualizarImagen
}