const { carritosDao, productosDao }  = require('../../src/daos/indexDaos');
const carritos = carritosDao;
const productos = productosDao;
const path = require('path');

/* traerProductos(productos).then(html => {
    document.getElementById('prod-cargados').innerHTML = html
});

function traerProductos(productos) { 
    const url = 'http://localhost:8080/main.hbs';
    return fetch(url)
        .then(res => res.text())
        .then(text => {
            const template = Handlebars.compile(text);
            const html = template({ productos })
            return html
        })
} */