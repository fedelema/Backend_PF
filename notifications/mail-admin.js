const dotenv = require("dotenv");
dotenv.config();

const MY_EMAIL_ADDRESS = process.env.MY_EMAIL_ADDRESS || 'anderson.considine@ethereal.email';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'RvN4q4d2BsPDVkHWWc';

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: MY_EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD
    }
});

async function mailRegistro(username, password, nombre, direccion, edad, interno, telefono) {
    try {
        const info1 = await transporter.sendMail({
            from: "Servidor PF",
            to: MY_EMAIL_ADDRESS,
            subject: "Nuevo Registro",
            html: `
                <h1>Datos del nuevo registro:</h1>
                <p>Mail: ${username}</p>
                <p>Contraseña: ${password}</p>
                <p>Nombre: ${nombre}</p>
                <p>Direccion: ${direccion}</p>
                <p>Edad: ${edad}</p>
                <p>Telefono completo: ${interno}-${telefono}</p>
            `
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = mailRegistro;