const { carritosDao, productosDao }  = require('../../src/daos/indexDaos');
const carritos = carritosDao;
const productos = productosDao;
const path = require('path');
const mailPedido = require('../../notifications/mail-pedido');

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

function verProductos() {
    //location.href = `/api/productos`
    window.location.replace(`/api/productos`)

}

function verCarrito(e) {
    //location.href = `/api/carritos/${e}/productos`
    //window.redirect = `/api/carritos/${e}/productos`
    window.location.replace(`/api/carritos/${e}/productos`)
}

function comprarCarrito(e) {
    //location.href = `/api/carritos/${e}/productos/comprar`
    //window.location = `/api/carritos/${e}/productos/comprar`
    window.location.replace(`/api/carritos/${e}/productos/comprar`)
}