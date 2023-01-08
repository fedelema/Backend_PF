const { Router } = require('express');
const router = Router();
const { authMiddleware } = require('../auth/index');

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

    res.send(`Carrito creado con éxito con id: ${nuevoId._id}`)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await carritos.deleteById(id);
    
    res.send(`Carrito con id: ${id} eliminado con éxito`)
});

router.get('/:id/productos', async (req, res) => {
    const id = req.params.id;
    const carritoBuscado = await carritos.getById(id);
    res.send(carritoBuscado.productos);
});

router.post('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const carrito = await carritos.getById(id);
    let prod = await productos.getById(id_prod);

    let duplicado = carrito.productos.find(x => x._id == id_prod);
    if(duplicado) {
        if(duplicado.cantidad >= duplicado.stock) {
            res.send(`No hay suficiente stock del producto con id: ${id}`)
        } else {
            duplicado.cantidad += 1;
            carritos.updateById(id, carrito);
        }
    } else {
        carrito.productos.push(prod);
        carritos.updateById(id, carrito);
    }

    res.send(`Producto con id: ${id_prod} agregado con éxito al carrito con id: ${id}`)
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    let carrito = await carritos.getById(id);
    let productosFiltrados = await carrito.productos.filter(e => e._id != id_prod);
    carrito.productos = productosFiltrados;

    await carritos.updateById(id, carrito);

    res.send(`Producto con id: ${id_prod} eliminado con éxito del carrito con id: ${id}`)
});

module.exports = router;