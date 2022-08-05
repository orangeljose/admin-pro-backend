const Hospital = require('../models/hospital');
const { response } = require('express');

const getHospitals = async (req, res) => {

    const hospitals = await Hospital.find().populate('usuario','nombre img');
    res.json({
        ok:true,
        hospitals,        
    })
}

const createHospital = async (req, res = response) => {

    const { nombre, img, usuario } = req.body;
    const uid = req.uid;

    try {

        const existName = await Hospital.findOne({ nombre });

        if( existName ){
            return res.status(400).json({
                ok: false,
                msg: 'ya existe un hospital con ese nombre'
            })
        }

        const hospital = new Hospital( { 
            usuario:uid, 
            ...req.body
        } );

        await hospital.save();

        res.status(200).json({
            ok:true,
            msj: 'Hospital creado',
            hospital: hospital,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar log..'
        })
    }

}

const updateHospital = async (req, res = response) => {

    const id = req.params.id;

    try {

        const dbhospital = await Hospital.findById( id );

        if( !dbhospital ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un hospital con ese id'
            })
        }

        const { nombre, usuario, ...fields} = req.body;

        if( dbhospital.nombre !== nombre ){
     
            const existName = await Hospital.findOne({ nombre });

            if( existName ){
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un hospital con ese nombre'
                })
            }

        }

        fields.nombre = nombre;
        const updatedHospital = await Hospital.findByIdAndUpdate( id, fields, { new: true} );
        res.status(200).json({
            ok:true,
            msj: 'Hospital actualizado',
            hospital: updatedHospital,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar log..'
        })
    }

}

const deleteHospital = async( req, res = response) =>{

    const id = req.params.id;

    try {

        const dbhospital = await Hospital.findById( id );

        if( !dbhospital ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un hospital con ese id'
            })
        }

        const updatedHospital = await Hospital.findByIdAndDelete( id );
        
        res.status(200).json({
            ok:true,
            msj: 'Doctor borrado',
            user: updatedHospital,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar log..'
        })
    }

}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,
}