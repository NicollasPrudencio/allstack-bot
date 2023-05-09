const { Client } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');
const app = express();
const port = 3000;

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
      const repoName = getRepoNameFromCommitURL(commitURL);

      // Verificar o nome do repositório e definir o ID do grupo correspondente
      let groupID;
      if (repoName === 'api-allstack') {
        groupID = '120363129757303262@g.us';
      } else if (repoName === 'frontend') {
        groupID = '120363148607141306@g.us';
      }

      // Enviar a mensagem para o grupo específico no WhatsApp
      const message = `Novo commit no repo "${repoName}":\n\nNome: ${commitMessage}\nUsuário: ${commitAuthor}\nURL: ${commitURL}\nData: ${commitDate}`;

      client.sendMessage(groupID, message)
        .then(() => {
          console.log('Mensagem enviada com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao enviar a mensagem:', error);
        });
    }

    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

// Função para obter o nome do repositório a partir da URL de commit
function getRepoNameFromCommitURL(commitURL) {
  const regex = /https:\/\/github.com\/.+?\/(.+?)\//;
  const match = commitURL.match(regex);
  return match ? match[1] : null;
}
