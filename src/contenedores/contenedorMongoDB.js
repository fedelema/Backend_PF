const mongoose = require('mongoose');
const { model, Types } = require('mongoose');
const config = require('../../config');

class ContenedorMongoDB {
    constructor(_coll, _schema) {
        this.model = model(_coll, _schema);
    }
    
    async save(object) {
        const doc = new this.model(object);
        const result = await doc.save();

        console.log(result);
        return result;
    }

    async getById (id) {
        //id = Types.ObjectId(id);
        const doc = await this.model.findOne({comprador: id});
        
        console.log(doc);
        return doc;
    }

    async getAll() {
        const docs = await this.model.find();

        console.log(docs);
        return docs;
    }

    async deleteById(id) {
        //id = Types.ObjectId(id);
        const result = await this.model.deleteOne({comprador: id});

        console.log(result);
        return result;
    }

    async deleteAll() {
        await this.model.deleteMany();
    }

    async updateById(id, object) {
        //id = Types.ObjectId(id);
        //const doc = await this.model.findOne({comprador: id});
        //doc = object;
        //const result = await doc.save();
        //console.log(result);
        //return result;

        const result = await this.model.updateOne({comprador: id}, object);
        return result;
    }
}

module.exports = ContenedorMongoDB