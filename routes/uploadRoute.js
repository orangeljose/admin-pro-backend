// Ruta: /api/uploads
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { uploadFile, showImage } = require('../controllers/uploadController');

const router = Router();

router.put( '/:tipo/:id', 
    [
        validarJWT, 
        check('id', 'el id debe de ser valido').isMongoId()
    ], 
    uploadFile);

router.get( '/:tipo/:image', 
    [
        validarJWT, 
    ], 
    showImage);

module.exports = router;