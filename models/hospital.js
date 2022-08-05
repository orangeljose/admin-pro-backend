const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    
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
}
// , { collections: 'hospitales' }
);

HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();    
    return object;
})

module.exports = model( 'Hospital', HospitalSchema );