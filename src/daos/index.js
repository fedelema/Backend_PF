let productosDao;
let carritosDao;
const config = require('../../config');

switch (config.DB) {
    // case 'json':
    //     const ProductosDaoArchivo = await require('../daos/productos/productosDaoArchivo');
    //     const CarritosDaoArchivo = await require('../daos/carritos/carritosDaoArchivo');
    //     productosDao = new ProductosDaoArchivo();
    //     carritosDao = new CarritosDaoArchivo();
    //     break;
    case 'mongodb':
        const ProductosDaoMongoDB = require('../daos/productos/productosDaoMongoDB');
        const CarritosDaoMongoDB = require('../daos/carritos/carritosDaoMongoDB');
        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        break;
    case 'firebase':
        const ProductosDaoFirebase = require('../daos/productos/productosDaoFirebase');
        const CarritosDaoFirebase = require('../daos/carritos/carritosDaoFirebase');
        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;
    
    // En default deje el case 'json'
    default:
        const ProductosDaoArchivo = require('../daos/productos/productosDaoArchivo');
        const CarritosDaoArchivo = require('../daos/carritos/carritosDaoArchivo');
        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritosDaoArchivo();
        break;
}

module.exports = {productosDao, carritosDao}