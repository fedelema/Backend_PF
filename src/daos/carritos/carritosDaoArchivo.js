const ContenedorArchivo = require('../../contenedores/contenedorArchivo');

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('carritos.txt')
    }
}

module.exports = CarritosDaoArchivo