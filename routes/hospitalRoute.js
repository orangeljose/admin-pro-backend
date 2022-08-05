// Ruta: /api/hospitals
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validate-jwt');

const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitalController');


const router = Router();

router.get( '/', validarJWT,  getHospitals);
router.post( '/',
    [ 
        validarJWT,
        check('nombre', 'el nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,createHospital);
router.put( '/:id',
    [ 
        validarJWT,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),        
        validarCampos
    ]
    ,updateHospital);
router.delete( '/:id', validarJWT, deleteHospital);

module.exports = router;