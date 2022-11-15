const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    nombre: {type: String},
    direccion: {type: String},
    edad: {type: Number},
    interno: {type: Number},
    telefono: {type: Number}
});

const User = mongoose.model('User', userSchema);

module.exports = User;