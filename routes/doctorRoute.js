// Ruta: /api/doctors
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');

const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/DoctorController');


const router = Router();

router.get( '/', validarJWT,  getDoctors);
router.post( '/',
    [ 
        validarJWT,
        check('nombre', 'el nombre del doctor obligatorio').not().isEmpty(),
        check('hospital', 'el hospital id debe de ser valido').isMongoId(),
        check('usuario', 'el usuario id debe de ser valido').isMongoId(),
        validarCampos
    ]
    ,createDoctor);
router.put( '/:id',
    [ 
        validarJWT,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),        
        validarCampos
    ]
    ,updateDoctor);
router.delete( '/:id', validarJWT, deleteDoctor);

module.exports = router;