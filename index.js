const express = require('express');
const path = require('path') // O path é um pacote do Node.js
const { connect } = require('./db')
const routerProdutos = require('./router');

const app = express();

connect();

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

/*
// Rota GET => /
app.get("/",(req,res) => {
    res.send("<h1>Workshop</h1>");
})
*/

// API Produtos CRUD
app.use('/produtos', routerProdutos);

/*
//Rota GET => /produtos
app.get("/produtos",(req,res) => {
    res.json(db_produtos);
})
*/

// middleware => 404
app.use((req, res ) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})