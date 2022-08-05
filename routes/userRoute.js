// Ruta: /api/users
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');


const router = Router();

router.get( '/', validarJWT,  getUsers);
router.post( '/',
    [ 
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        validarCampos
    ]
    ,createUser);
router.put( '/:id',
    [ 
        validarJWT,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),        
        check('email', 'el email es obligatorio').isEmail(),
        check('role', 'el role es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,updateUser);
router.delete( '/:id', validarJWT, deleteUser);    

module.exports = router;