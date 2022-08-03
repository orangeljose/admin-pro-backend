//Para obtener variables de entorno
require('dotenv').config();
//configuracion inicial de express y cors
const express = require('express');
const cors = require('cors');
//conexion con la base de datos
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
