const express = require('express');
const app = express();
const routerProductos = require('./routes/productos');
const routerCarritos = require('./routes/carritos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);

app.get('/', (req, res) => {
    res.send('Hola Vercel!');
});
 
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));