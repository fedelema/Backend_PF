const ContenedorArchivo = require('../../contenedores/contenedorArchivo');

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('productos.txt')
    }
}

module.exports = ProductosDaoArchivo