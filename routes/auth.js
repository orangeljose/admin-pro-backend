// Ruta: /api/user
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { loginUser } = require('../controllers/authController')


const router = Router();

router.post( '/',
    [ 
        check('password', 'el password es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        validarCampos
    ]
    ,loginUser);

module.exports = router;