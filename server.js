const express = require('express');
const path= require('path');
const app = express();

const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));/* lee form html*/
app.use(express.static(path.join(__dirname, 'public')));


const libroRoutes = require('./routes/libro.routes');
app.use('/libros', libroRoutes);

app.listen(PORT, () =>{
   console.log(`Servidor corriendo en  http://localhost:${PORT}`)
});

