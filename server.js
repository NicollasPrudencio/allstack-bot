const { Client } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');
const app = express();
const port = 80;

app.use(express.json());

// Configurar o cliente do WhatsApp
const client = new Client();

// Autenticar usando o código QR
client.on('qr', (qrCode, scanStatus) => {
    qrcode.generate(qrCode, { small: true }); // Renderizar o código QR no terminal
    console.log('Escaneie o código QR com o seu aplicativo WhatsApp:');
});

// Evento de autenticação bem-sucedida
client.on('authenticated', (session) => {
    console.log('Autenticado no WhatsApp.');
    startListening(); // Iniciar o servidor após a autenticação
});

// Inicializar o cliente do WhatsApp
client.initialize();

// Iniciar o servidor
function startListening() {
    app.post('/payload', (req, res) => {
        const { commits } = req.body;

        if (commits && commits.length > 0) {
            const commit = commits[0];
            const commitMessage = commit.message;
            const commitAuthor = commit.author.username;
            const commitURL = commit.url;
            const commitDate = new Date(commit.timestamp).toLocaleString(); // Obter a data formatada

            // Enviar a mensagem para o grupo específico no WhatsApp
            const message = `Novo commit no repo de back end:\n\nNome: ${commitMessage}\nUsuário: ${commitAuthor}\nLocal: ${commitURL}\nData: ${commitDate}`; // Adicionar a data na última linha da mensagem
            const groupID = 'EIRMKudB0CP3WZGm1SQwnm'; // Substitua pelo ID do grupo específico

            client.sendMessage(groupID, message).then(() => {
                console.log('Mensagem enviada com sucesso!');
            }).catch((error) => {
                console.error('Erro ao enviar a mensagem:', error);
            });
        }

        res.sendStatus(200);
    });

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}
