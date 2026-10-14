const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configurar base de datos SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Conectado a la base de datos.');
});

db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    categoria TEXT,
    precio REAL
)`);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/guardar', (req, res) => {
    const { nombre, categoria, precio } = req.body;
    db.run(`INSERT INTO productos (nombre, categoria, precio) VALUES (?, ?, ?)`, 
    [nombre, categoria, precio], (err) => {
        if (err) return res.status(500).send("Error al guardar");
        res.send("¡Producto guardado exitosamente con éxito!");
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});