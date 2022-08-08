const User = require('../models/user');
const { response } = require('express');
const  bcrypt  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const loginUser = async (req, res = response ) => {

    const { email, password } = req.body;

    try {

        const dbUser = await User.findOne({ email });

        if( !dbUser ){
            return res.status(400).json({
                ok: true,
                msg: 'email no encontrado'
            })
        }

        const validPassword = bcrypt.compareSync( password, dbUser.password);
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'contraseña no valida'
            })
        }

        const token = await generarJWT(dbUser.id);

        res.status(200).json({
            ok: true,
            msg: 'usuario autenticado',
            token: token,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error contacte con el administrador'
        })
    }


}

const googleSignIn = async (req, res = response ) => {
    
    try {

        const { email, name, picture } = await googleVerify( req.body.token);

        usuariodb = await User.findOne( {email} );
        let usuario;

        if(!usuariodb){

            usuario = new User({
                nombre: name,
                email,
                img: picture,
                password: '@@@',
                google: true,
            });

        }else{

            usuario = usuariodb;
            usuario.google = true;
        }

        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            msg: 'usuario autenticado',
            email, name, picture,
            token
        });
        
    } catch (error) {
        
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'token de google no es correcto',

        });
        
    }


}


module.exports = {
    loginUser,
    googleSignIn,
}