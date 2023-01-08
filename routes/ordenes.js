const { Router } = require('express');
const router = Router();
const mailPedido = require('../notifications/mail-pedido');
const wpPedido = require('../notifications/wp-pedido');
const smsCliente = require('../notifications/sms-cliente');
const { carritosDao, productosDao, ordenesDao }  = require('../src/daos/indexDaos');

const carritos = carritosDao;
const productos = productosDao;
const ordenes = ordenesDao;

router.get('/', async (req, res) => {
    res.send(await ordenes.getAll());
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const orden = await ordenes.getById(id);
    
    res.send(orden);
});

router.get('/comprador/:comprador', async (req, res) => {
    const comprador = req.params.comprador;
    let ordenesTodas = await ordenes.getAll();
    let ordenesFiltradas = ordenesTodas.filter(x => x.comprador == comprador);

    res.send(ordenesFiltradas);
});

router.post('/:id/comprar', async (req, res) => {
    const id = req.params.id;
    const carrito = await carritos.getById(id);
    const mail = await mailPedido(carrito.comprador, carrito.productos);
    //const sms = await smsCliente();
    //const wp = await wpPedido(id);
    
    let precioTotal = 0;
    for(let i=0; i<carrito.productos.length; i++) {
        precioTotal += carrito.productos[i].precio * carrito.productos[i].cantidad;
    }
    const nuevaOrden = {
        timestamp_orden: Date.now(),
        comprador: carrito.comprador,
        productos: carrito.productos,
        precioTotal: precioTotal
    }
    let nuevoId = await ordenes.save(nuevaOrden);

    carrito.productos = [];
    carritos.updateById(id, carrito);
    res.send(`Compra realizada con éxito con id: ${nuevoId._id}`);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await ordenes.deleteById(id);
    
    res.send(`Orden con id: ${id} eliminada con éxito`)
});

module.exports = router;