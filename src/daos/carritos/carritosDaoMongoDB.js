const ContenedorMongoDB = require('../../contenedores/contenedorMongoDB');
const { Schema } = require('mongoose');

const carritoSchema = new Schema({
    productos: {type: Array, default: []}
}, {timestamps: true});

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super('carritos', carritoSchema)
    }
}

module.exports = CarritosDaoMongoDB