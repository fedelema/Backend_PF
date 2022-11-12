const firebase = require('firebase-admin');
const serviceAccount = require('../../backend-2ada6.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://backend-2ada6.firebaseio.com"
});

const db = firebase.firestore();

class ContenedorFirebase {
    constructor(_coll) {
        this.collection = db.collection(_coll);
    }
    
    async save(object) {
        const doc = this.collection.doc();
        const result = await doc.create(object);

        console.log(result);
        return result;
    }

    async getById(id) {
        const doc = this.collection.doc(`${id}`);
        const buscado = await doc.get();
        const data = buscado.data();

        console.log({id, ...data});
        return {id, ...data};
    }

    async getAll() {
        let array = [];
        const querySnapshot = await this.collection.get();
        // const docs = querySnapshot.docs;
        // const result = docs.map(doc => {
        //     doc.data()
        // });
        
        querySnapshot.forEach(doc => 
            array.push(doc.data()),
        );

        console.log(array);
        return array;
    }

    async deleteById(id) {
        const doc = this.collection.doc(`${id}`);
        const result = await doc.delete();
        
        console.log(result);
        return result;
    }

    async deleteAll() {
        const querySnapshot = await this.collection.get();
        const docs = querySnapshot.docs;
        const result = docs.delete();
    }

    async updateById(id, object) {
        const doc = this.collection.doc(`${id}`);
        const result = await doc.update(object);

        console.log(result);
        return result;
    }
}

module.exports = ContenedorFirebase