//Para obtener variables de entorno
require('dotenv').config();
//configuracion inicial de express y cors
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
//conexion con la base de datos
const { dbConection } = require('./database/config');


// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );
// Carpeta publica
app.use( express.static('public'));
// Lectura y Parseo del Body
app.use( express.json() );
// Para subir archivos
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,
}));

// Base de datos
dbConection();

// Rutas
app.use( '/api/users', require('./routes/userRoute'));
app.use( '/api/hospitals', require('./routes/hospitalRoute'));
app.use( '/api/doctors', require('./routes/doctorRoute'));
app.use( '/api/login', require('./routes/authRoute'));
app.use( '/api/todo', require('./routes/searchRoute'));
app.use( '/api/uploads', require('./routes/uploadRoute'));

app.listen( process.env.PORT, ()=> { console.log('escuchando')} );
