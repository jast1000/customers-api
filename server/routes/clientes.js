const express = require('express');
const { validarCliente } = require('../middlewares/validador');

const app = express();

let customers = [
    { id: 1, nombre: 'Jesús', correo: 'jast1000@gmail.com', telefono: '2722151522' },
    { id: 2, nombre: 'Estaban', correo: 'estaban@gmail.com', telefono: '1234567890' },
    { id: 3, nombre: 'Leonardo', correo: 'leo@gmail.com', telefono: '0987654321' }
];

app.get('/v1/customers', (req, res) => {
    let nombre = req.query.nombre;
    if (nombre) {
        let filtrados = customers.filter((client) => client.nombre.toLowerCase().indexOf(nombre.toLowerCase()) >= 0);
        return res.json(filtrados);
    } else {
        return res.json(customers);
    }
});

app.get('/v1/customers/:id', (req, res) => {
    let id = req.params.id;
    let customer = customers.find((client) => client.id == id);
    if (!customer) {
        return res.status(400).json();
    }
    return res.json(customer);
});

app.post('/v1/customers', [validarCliente], (req, res) => {
    let { nombre, correo, telefono } = req.body;
    let id = customers[customers.length - 1].id;
    id++;
    customers.push({ id, nombre, correo, telefono });
    return res.json();
});

app.put('/v1/customers/:id', [validarCliente], (req, res) => {
    let id = req.params.id;
    let { nombre, correo, telefono } = req.body;
    let customerIndex = customers.findIndex((client) => client.id == id);
    if (customerIndex < 0) {
        return res.status(400).json({ response: 'Cliente inválido' });
    }
    let customeer = customers[customerIndex];
    customeer.nombre = nombre;
    customeer.correo = correo;
    customeer.telefono = telefono;
    customers[customerIndex] = customeer;
    return res.json();
});

app.delete('/v1/customers/:id', (req, res) => {
    let id = req.params.id;
    let customerIndex = customers.findIndex((client) => client.id == id);
    if (customerIndex < 0) {
        return res.status(400).json({ response: 'Cliente inválido' });
    }
    customers.splice(customerIndex, 1);
    return res.json();
});

module.exports = app;