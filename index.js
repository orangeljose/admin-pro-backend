require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y Parseo del Body
app.use( express.json() );

// Base de datos
dbConection();

// Rutas
app.use( '/api/users', require('./routes/user'));
app.use( '/api/login', require('./routes/auth'));

app.listen( process.env.PORT, ()=> { console.log('escuchando')} );
