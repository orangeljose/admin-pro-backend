const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    
    nombre: {
        type: String,
        require: true,
        unique: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User',
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    },
}
// , { collections: 'doctores' }
);

DoctorSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();    
    return object;
})

module.exports = model( 'Doctor', DoctorSchema );