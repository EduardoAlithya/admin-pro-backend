const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
}, { collecction: 'Medicos'});

//permite limpiar el objeto
MedicoSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model( 'Medico', MedicoSchema );