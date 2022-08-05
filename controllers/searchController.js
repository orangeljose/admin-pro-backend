const { response } = require('express');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const search = async (req, res = response ) => {

    const busqueda = req.params.search;
    const regex = new RegExp( busqueda, 'i');

    try {

        const [usuario, doctor, hospital] = await Promise.all([

            User.find({ nombre: regex}),
            Doctor.find({ nombre: regex}),
            Hospital.find({ nombre: regex}),

        ]);

        res.status(200).json({
            ok: true,
            msg: 'busqueda exitosa',
            usuario,
            doctor,
            hospital
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error contacte con el administrador'
        })
    }

}

searchCollection = async (req, res= response) => {

    const collection = req.params.collection;
    const search = req.params.search;
    const regex = new RegExp( search, 'i');
    
    try {
        let data = [];

        switch (collection) {
            case 'user':
                data = await User.find({ nombre: regex});                                 
                break;
            case 'doctor': 
                data = await Doctor.find({ nombre: regex})
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');
                break;
            case 'hospital': 
                data = await Hospital.find({ nombre: regex})
                                    .populate('usuario', 'nombre img');                                    
                break;
        
            default: res.status(400).json({
                            ok: false,
                            msg: 'debe ingresar el nombre de una coleccion valida como criterio de busqueda'
                        })
                break;
        }

        res.status(200).json({
            ok: true,
            msg: 'busqueda exitosa',
            collection,
            search,
            data
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error contacte con el administrador'
        })        
    }
}

module.exports = {
    search,
    searchCollection,
}