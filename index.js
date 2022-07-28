require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Base de datos
dbConection();

// Rutas
app.get( '/', (req, res) => {
    res.json({
        ok:true,
        msg:'Hola mundo'
    })
});
app.listen( process.env.PORT, ()=> { console.log('escuchando')} );
