
js
client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    // You can also use a QR code generator to display this QR in a browser
});


js
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const app = express();

const client = new Client();
let qrCodeData = '';

client.on('qr', (qr) => {
    qrCodeData = qr;
});

client.initialize();

app.get('/scanner', async (req, res) => {
    if (qrCodeData) {
        const qrImage = await qrcode.toDataURL(qrCodeData);
        res.send(`<img src="${qrImage}" style="width:300px;"/>`);
    } else {
        res.send('Loading QR...');
    }
});

app.listen(3000, () => console.log('QR Scanner running on port 3000'));
