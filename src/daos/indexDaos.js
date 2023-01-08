let productosDao;
let carritosDao;
let ordenesDao;
const config = require('../../config');

switch (config.DB) {
    case 'mongodb':
        const ProductosDaoMongoDB = require('../daos/productos/productosDaoMongoDB');
        const CarritosDaoMongoDB = require('../daos/carritos/carritosDaoMongoDB');
        const OrdenesDaoMongoDB = require('../daos/ordenes/ordenesDaoMongoDB');
        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        ordenesDao = new OrdenesDaoMongoDB();
        break;
    case 'firebase':
        const ProductosDaoFirebase = require('../daos/productos/productosDaoFirebase');
        const CarritosDaoFirebase = require('../daos/carritos/carritosDaoFirebase');
        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;
    default:
        const ProductosDaoArchivo = require('../daos/productos/productosDaoArchivo');
        const CarritosDaoArchivo = require('../daos/carritos/carritosDaoArchivo');
        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritosDaoArchivo();
        break;
}

module.exports = {productosDao, carritosDao, ordenesDao}