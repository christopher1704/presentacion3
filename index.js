const express = require('express');

const app = express();

//settings 
app.set('port',8000);

const cors = require('cors');
const {dbConnection} = require('./database/config');

// Configurar cors
app.use(cors());     //use es conocido como middlewere , es una funcion que se va a ejecutar siempre para todas las lineas que sigue hacia abajo

// Lectura y parseo del body
app.use(express.json());

app.use('/api/users', require('./routes/user.route'));


// Base de Datos
dbConnection();

app.listen(8000, () => {
    console.log("Aplicacion corriendo en el puerto 8000");
});