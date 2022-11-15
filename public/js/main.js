const Producto = require('../../src/contenedores/contenedorArchivo');
const productos = new Producto('../../productos.txt');

traerProductos(productos).then(html => {
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
}

function verProductos() {
    location.href = '/api/productos'
}

function verCarrito(e) {
    location.href = `/api/carritos/${e}/productos`
}