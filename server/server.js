require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

//Instancia del server
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Rutas
app.use(require('./routes/clientes'));

//Levantar listener
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${ port }`, );
});