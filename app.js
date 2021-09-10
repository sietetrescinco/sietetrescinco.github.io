const express = require('express');
const path = require('path');
const fs  = require('fs');


const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile('./public/index.html');
});

app.get('/get-peliculas', (req, res) => {
    const file = fs.readFileSync('./peliculas.json', 'UTF-8');
    res.setHeader('Content-type', 'text/json');
    res.send(file);
});

app.post('/new', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    const nombre = req.body.nombre;
    const rating = req.body.rating;

    let file = fs.readFileSync('./peliculas.json', 'UTF-8');
    const json = JSON.parse(file);
    json.peliculas.push({"nombre": nombre, "rating": parseInt(rating)})

    file = fs.writeFileSync('./peliculas.json', JSON.stringify(json));

    res.send('Datos guardados con exito');
}); 

app.listen(3001, () => {
    console.log('server start');
});