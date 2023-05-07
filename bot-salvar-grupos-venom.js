const venom = require('venom-bot');
const fs = require('fs');

venom.create().then((client) => {
    // Evento de geração do QR Code
    client.onStateChange((state) => {
        if (state.qrCode) {
            console.log('Escaneie o código QR com o seu aplicativo WhatsApp:');
            console.log(state.qrCode);
        }
    });

    // Evento de autenticação bem-sucedida
    client.onStateChange((state) => {
        if (state === 'CONNECTED') {
            console.log('Autenticado no WhatsApp.');
            getGroupsAndSaveToFile(client, 'grupos.txt'); // Obter grupos e salvar em um arquivo
        }
    });

    // Inicializar o cliente do WhatsApp
    client.onReady(() => {
        console.log('Cliente pronto!');
    });

    // Função para obter todos os grupos e salvar em um arquivo
    async function getGroupsAndSaveToFile(client, filename) {
        try {
            const groups = await client.getAllGroups();

            const groupData = groups.map((group) => ({
                id: group.id._serialized,
                name: group.name,
            }));

            fs.writeFile(filename, JSON.stringify(groupData), (err) => {
                if (err) throw err;
                console.log(`Grupos salvos em "${filename}".`);
            });
        } catch (error) {
            console.error('Erro ao obter os grupos:', error);
        }

        // Encerrar a execução do bot após salvar os grupos
        client.close();
    }
}).catch((error) => {
    console.error('Erro ao criar o cliente do WhatsApp:', error);
});
