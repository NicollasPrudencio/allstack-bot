const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Configurar o cliente do WhatsApp
const client = new Client();

// Evento de geração do QR Code
client.on('qr', (qrCode) => {
    console.log('Escaneie o código QR com o seu aplicativo WhatsApp:');
    qrcode.generate(qrCode, { small: true });
});

// Evento de autenticação bem-sucedida
client.on('authenticated', (session) => {
    console.log('Autenticado no WhatsApp.');
    getGroupsAndSaveToFile(); // Obter grupos e salvar em um arquivo
});

// Inicializar o cliente do WhatsApp
client.initialize();

// Função para obter todos os grupos e salvar em um arquivo
async function getGroupsAndSaveToFile() {
    const chats = await client.getChats();
    console.log(chats);

    // ...

    fs.writeFile(filename, jsonData, (err) => {
        if (err) throw err;
        console.log(`Grupos salvos em "${filename}".`);
        client.destroy(); // Encerrar a execução do bot após salvar os grupos
    });
}
