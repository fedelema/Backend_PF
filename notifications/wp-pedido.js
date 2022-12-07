const dotenv = require("dotenv");
dotenv.config();
const twilio = require("twilio");

const MY_PHONE = process.env.MY_PHONE || 'whatsapp:+5491141601105';

const sid = "AC624536f4f9e522ed6368035ab46007c6";
const token = "955f198c41c8b9cd2e5ebf7191d1fcdb";
const client = twilio(sid, token);

async function wpPedido(comprador) {
    try {
        const info = await client.messages.create({
            from: "whatsapp:+14155238886",
            to: MY_PHONE,
            body: `Nuevo pedido de ${comprador}`
        });
        console.log('WHATSAPP DE TWILIO', info);
    } catch(err) {
        console.log(err)
    }
}

module.exports = wpPedido;