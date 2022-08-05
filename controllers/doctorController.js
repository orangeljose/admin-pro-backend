const Doctor = require('../models/doctor');
const { response } = require('express');

const getDoctors = async (req, res) => {

    const doctors = await Doctor.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')
    res.json({
        ok:true,
        doctors,        
    })
}

const createDoctor = async (req, res = response) => {

    const { nombre, img, hospital } = req.body;
    const uid = req.uid;

    try {

        const existName = await Doctor.findOne({ nombre });

        if( existName ){
            return res.status(400).json({
                ok: false,
                msg: 'ya existe un doctor con ese nombre'
            })
        }

        const doctor = new Doctor( {
            usuario: uid,
            ...req.body
        } );

        await doctor.save();

        res.status(200).json({
            ok:true,
            msj: 'Doctor creado',
            doctor: doctor,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar log..'
        })
    }

}

const updateDoctor = async (req, res = response) => {

    const id = req.params.id;

    try {

        const dbdoctor = await Doctor.findById( id );

        if( !dbdoctor ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un doctor con ese id'
            })
        }

        const { nombre, usuario, ...fields} = req.body;

        if( dbdoctor.nombre !== nombre ){
     
            const existName = await Doctor.findOne({ nombre });

            if( existName ){
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un doctor con ese nombre'
                })
            }

        }

        fields.nombre = nombre;
        const updatedDoctor = await Doctor.findByIdAndUpdate( id, fields, { new: true} );
        res.status(200).json({
            ok:true,
            msj: 'Doctor actualizado',
            doctor: updatedDoctor,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar log..'
        })
    }

}

const deleteDoctor = async( req, res = response) =>{

    const id = req.params.id;

    try {

        const dbdoctor = await Doctor.findById( id );
        console.log(dbdoctor);
        if( !dbdoctor ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un doctor con ese id'
            })
        }

        const updatedDoctor = await Doctor.findByIdAndDelete( id );
        
        res.status(200).json({
            ok:true,
            msj: 'Hospital borrado',
            doctor: updatedDoctor,
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
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}