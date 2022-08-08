// Ruta: /api/auth
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { loginUser, googleSignIn } = require('../controllers/authController')


const router = Router();

router.post( '/',
    [ 
        check('password', 'el password es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        validarCampos
    ]
    ,loginUser);

router.post( '/google',
    [ 
        check('token', 'el token de google es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,googleSignIn);

module.exports = router;