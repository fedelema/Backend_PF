const dotenv = require("dotenv");
dotenv.config();
const twilio = require("twilio");

const MY_PHONE = process.env.MY_PHONE || '+541141601105';

const sid = "AC624536f4f9e522ed6368035ab46007c6";
const token = "955f198c41c8b9cd2e5ebf7191d1fcdb";
const client = twilio(sid, token);

const smsOptions = {
    from: "+18087364996",
    to: MY_PHONE,
    body: "Nuevo pedido de {nombre} - {username}"
}

async function send() {
    try {
        const info = await client.messages.create(smsOptions);
        console.log(info);
    } catch(err) {
        console.log(err)
    }
}

send();