const ContenedorFirebase = require('../../contenedores/contenedorFirebase');

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos')
    }
}

module.exports = CarritosDaoFirebase