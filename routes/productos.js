const { Router } = require('express');
const router = Router();
const { authMiddleware } = require('../auth/index');
const path = require('path');

const { productosDao }  = require('../src/daos/indexDaos');
let productos = productosDao;

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
        let prods = await productos.getAll();
        let prod = prods.find(x => x._id == id);
        if(prod) {
            res.send(await productos.getById(id));
            return
        } else {
            res.send('El producto no existe')
        }
    } else {
        res.send(await productos.getAll());
        return
    }
    /*     const id = req.params.id;
    if(id) {
        let prod = await productos.getById(id)
        res.render(path.resolve('public/productos.ejs'), {productos: prod});
        return
    } else {
        let prods = await productos.getAll()
        res.render(path.resolve('public/productos.ejs'), {productos: prods});
        return
    } */
});

router.get('/categoria/:cat', async (req, res) => {
    const cat = req.params.cat;
    let prods = await productos.getAll();
    let prodsCat = prods.filter(x => x.categoria === cat);

    res.send(prodsCat)
});

router.post('/', soloAdmins, async (req, res) => {
    const body = await req.body;
    if(body.nombre && body.descripcion && body.precio && body.foto && body.stock && body.categoria) {
        const nuevoProd = {
            timestamp: Date.now(),
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            foto: body.foto,
            stock: body.stock,
            cantidad: 1,
            categoria: body.categoria
        }
        let nuevoId = await productos.save(nuevoProd);

        res.send(`Producto agregado con éxito con id: ${nuevoId._id}`)
    }
});

router.put('/:id', soloAdmins, async (req, res) => {
    const id = req.params.id;
    const body = await req.body;
    if(body.nombre && body.descripcion && body.precio && body.foto && body.stock && body.categoria) {
        const prod = productos.getById(id);
        prod.nombre = body.nombre;
        prod.descripcion = body.descripcion;
        prod.precio = body.precio;
        prod.foto = body.foto;
        prod.stock = body.stock;
        prod.categoria = body.categoria;
        productos.updateById(id, prod);
    }
    res.send(`Producto con id: ${id} actualizado con éxito`)
});

router.delete('/:id', soloAdmins, (req, res) => {
    const id = req.params.id;
    productos.deleteById(id);
    res.send(`Producto con id: ${id} eliminado con éxito`)
});

module.exports = router;