const dotenv = require("dotenv");
dotenv.config();

const MY_EMAIL_ADDRESS = process.env.MY_EMAIL_ADDRESS || 'hollis79@ethereal.email';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'zBh4r3EmCusygYS1WP';

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: MY_EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD
    }
});

async function mailPedido(comprador, productos) {
    try {
        const info1 = await transporter.sendMail({
            from: "Servidor PF",
            to: MY_EMAIL_ADDRESS,
            subject: `Nuevo Pedido de ${comprador}`,
            html: `Productos comprados: ${productos}`
        });
        console.log(info1);
    } catch (err) {
        console.log(err);
    }
}

module.exports = mailPedido;