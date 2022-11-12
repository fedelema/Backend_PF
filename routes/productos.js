const { Router } = require('express');
const router = Router();

const { productosDao }  = require('../src/daos/index');
const productos = productosDao;

const esAdmin = true;

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.send({error:-1, descripcion:"ruta 'x' método 'y' no autorizada"})
    } else {
        next()
    }
}

router.get('/:id?', async (req, res) => {
    const id = req.params.id;
    if(id) {
        res.send(await productos.getById(id));
        return
    } else {
        res.send(await productos.getAll());
        return
    }
});

router.post('/', soloAdmins, async (req, res) => {
    const body = await req.body;
    if(body.nombre && body.descripcion && body.precio && body.foto && body.stock) {
        const nuevoProd = {
            timestamp: Date.now(),
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            foto: body.foto,
            stock: body.stock
        }
        let nuevoId = productos.save(nuevoProd);

        res.send('Producto agregado con éxito con id: ' + nuevoId)
    }
});

router.put('/:id', soloAdmins, async (req, res) => {
    const id = req.params.id;
    const body = await req.body;
    if(body.nombre && body.descripcion && body.precio && body.foto && body.stock) {
        const prod = productos.getById(id);
        prod.nombre = body.nombre;
        prod.descripcion = body.descripcion;
        prod.precio = body.precio;
        prod.foto = body.foto;
        prod.stock = body.stock;
        productos.updateById(id, prod);
    }
    res.send(`Producto con id:${id} actualizado con éxito`)
});

router.delete('/:id', soloAdmins, (req, res) => {
    const id = req.params.id;
    productos.deleteById(id);
    res.send(`Producto con id:${id} eliminado con éxito`)
});

module.exports = router;