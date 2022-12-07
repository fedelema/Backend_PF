const dotenv = require("dotenv");
dotenv.config();
const twilio = require("twilio");

const MY_PHONE = process.env.MY_PHONE || '+541141601105';

const sid = "AC624536f4f9e522ed6368035ab46007c6";
const token = "955f198c41c8b9cd2e5ebf7191d1fcdb";
const client = twilio(sid, token);

async function smsCliente() {
    try {
        const info = await client.messages.create({
            body: "Su pedido ha sido recibido y se encuentra en proceso",
            from: '+18087364996',
            to: '+541141601105'
            //to: ${comprador.telefono}
        });
    } catch(err) {
        console.log(err)
    }
}

module.exports = smsCliente;