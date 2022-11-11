const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hola Vercel!');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
});