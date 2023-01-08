const ContenedorMongoDB = require('../../contenedores/contenedorMongoDB');
const { Schema } = require('mongoose');

const ordenSchema = new Schema({
    productos: {type: Array},
    comprador: {type: String},
    precioTotal: {type: Number}
}, {timestamps: true});

class OrdenesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super('ordenes', ordenSchema)
    }
}

module.exports = OrdenesDaoMongoDB