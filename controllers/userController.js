const User = require('../models/user');
const { response } = require('express');
const  bcrypt  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsers = async (req, res) => {

    const users = await User.find({}, 'nombre email role google')
    res.json({
        ok:true,
        users,
        uid: req.uid
    })
}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existMail = await User.findOne({ email });

        if( existMail ){
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya esta registrado'
            })
        }

        const user = new User( req.body );
        //encryptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();
        //generar JWT
        const token = await generarJWT( user.id );

        res.status(200).json({
            ok:true,
            msj: 'Usuario creado',
            user,
            token: token,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar log..'
        })
    }

}

const updateUser = async (req, res = response) => {

    const uid = req.params.id;
    //TODO: validar token
    try {

        const dbuser = await User.findById( uid );

        if( !dbuser ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id'
            })
        }

        const {password, google, email, ...fields} = req.body;

        if( dbuser.email !== email ){
     
            const existMail = await User.findOne({ email });

            if( existMail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con ese email'
                })
            }

        }

        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate( uid, fields, { new: true} );
        res.status(200).json({
            ok:true,
            msj: 'Usuario actualizado',
            user: updatedUser,
        });

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar log..'
        })
    }

}

const deleteUser = async( req, res = response) =>{

    const uid = req.params.id;

    try {

        const dbuser = await User.findById( uid );

        if( !dbuser ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe un usuario con ese id'
            })
        }

        const updatedUser = await user.findByIdAndDelete( uid );
        
        res.status(200).json({
            ok:true,
            msj: 'Usuario borrado',
            user: uid,
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
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}