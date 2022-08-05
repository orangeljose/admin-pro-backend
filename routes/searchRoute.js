// Ruta: /api/search
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validate-jwt');

const { search, searchColection } = require('../controllers/searchController')


const router = Router();

router.post( '/:search', validarJWT, search);
router.post( '/:collection/:search', validarJWT, searchCollection);

module.exports = router;