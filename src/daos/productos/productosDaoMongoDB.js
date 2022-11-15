const ContenedorMongoDB = require('../../contenedores/contenedorMongoDB');
const { Schema } = require('mongoose');

const productoSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    precio: {type: Number, required: true},
    foto: {type: String, required: true},
    stock: {type: Number, required: true}
}, {timestamps: true});

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super('productos', productoSchema)
    }
}

module.exports = ProductosDaoMongoDB