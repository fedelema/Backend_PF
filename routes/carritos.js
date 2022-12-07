const { Router } = require('express');
const router = Router();
const { authMiddleware } = require('../auth/index');
const path = require('path');
const mailPedido = require('../notifications/mail-pedido');
const wpPedido = require('../notifications/wp-pedido');
const smsCliente = require('../notifications/sms-cliente');
const { carritosDao, productosDao }  = require('../src/daos/indexDaos');

const carritos = carritosDao;
const productos = productosDao;

const esAdmin = true;

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json({error:-1, descripcion:"ruta 'x' método 'y' no autorizada"})
    } else {
        next()
    }
}

router.post('/', async (req, res) => {
    const comprador = req.body.comprador
    const nuevoCarrito = {
        timestamp_carrito: Date.now(),
        comprador: comprador,
        productos: []
    }
    let nuevoId = await carritos.save(nuevoCarrito);

    res.send(`Carrito creado con éxito con id:${nuevoId}`)
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    carritos.deleteById(id);
    
    res.send(`Carrito con id:${id} eliminado con éxito`)
});

router.get('/:id/productos', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const carritoBuscado = await carritos.getById(id);
    res.send(carritoBuscado.productos);
});

router.get('/:id/productos/comprar', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const carritoBuscado = await carritos.getById(id);
    const mail = await mailPedido(id, carritoBuscado.productos);
    const sms = await smsCliente();
    //wpPedido(id);
    res.sendFile(path.resolve('public/carrito.html'));
});

router.post('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const carrito = await carritos.getById(id);
    const prod = await productos.getById(id_prod);
    carrito.productos.push(prod);
    carritos.updateById(id, carrito);

    res.send(`Producto con id:${id_prod} agregado con éxito al carrito con id:${id}`)
});

router.delete('/:id/productos/:id_prod', (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const carrito = carritos.getById(id);
    carrito.productos = carrito.productos.filter(e => e.id != id_prod);
    carritos.updateById(id, carrito);

    res.send(`Producto con id:${id_prod} eliminado con éxito del carrito con id:${id}`)
});

module.exports = router;