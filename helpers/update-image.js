const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const fs = require('fs');

const deleteOldImage = ( collection, data) => {

    const path = `./uploads/${collection}/${data}`;
    if( fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

const updateImage = async ( collection, id, nombreArchivo ) => {

    switch (collection) {
        case 'user':

            const user = await User.findById(id);
            if(!user){
                console.log('no existe usuario con ese id');
                return false;
            }

            deleteOldImage(collection, user.img);
            user.img = nombreArchivo;
            await user.save();
            return true;     

            break;
        case 'doctor': 

            const doctor = await Doctor.findById(id);
            if(!doctor){
                console.log('no existe doctor con ese id');
                return false;
            }

            deleteOldImage(collection, doctor.img);
            doctor.img = nombreArchivo;
            await doctor.save();
            return true;

            break;
        case 'hospital': 

            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('no existe hospital con ese id');
                return false;
            }

            deleteOldImage(collection, hospital.img);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;      

            break;    
        default: res.status(400).json({
                        ok: false,
                        msg: 'debe ingresar el nombre de una coleccion valida como criterio de busqueda'
                    })
            break;
    }
}

module.exports = {
    updateImage,
}