const { Client } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');
const app = express();
const port = 3000;

async function pegarIDGrupo(nomeGrupo){
    const chats = await Client.getChats();
    
}

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

// Função para obter o ID do grupo com base no nome do grupo
async function getGroupId(groupName) {
    const chats = await client.getChats();
    const group = chats.find(chat => chat.isGroup && chat.name === groupName);
    return group ? group.id._serialized : null;
}

// Iniciar o servidor
function startListening() {
    app.post('/payload', async (req, res) => {
        const { commits } = req.body;

        if (commits && commits.length > 0) {
            const commit = commits[0];
            const commitMessage = commit.message;
            const commitAuthor = commit.author.username;
            const commitURL = commit.url;
            const commitDate = new Date(commit.timestamp).toLocaleString(); // Obter a data formatada

            // Obter o ID do grupo com base no nome do grupo
            const groupName = 'Back End - Projeto All Stack';
            const groupID = await getGroupId(groupName);

            if (!groupID) {
                console.error(`Grupo "${groupName}" não encontrado.`);
                res.sendStatus(404);
                return;
            }

            // Enviar a mensagem para o grupo específico no WhatsApp
            const message = `Novo commit no repo de back end:\n\nNome: ${commitMessage}\nUsuário: ${commitAuth}
            
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
