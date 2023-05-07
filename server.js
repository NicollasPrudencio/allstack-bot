const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4567;
let numReq = 0;

app.use(bodyParser.json());

app.post('/payload', (req, res) => {
    numReq++;

    const githubToken = process.env.GITHUB_TOKEN;

    // Verifica se o token está presente
    if (!githubToken) {
        return res.status(401).send('Token de acesso não configurado');
    }

    // Verifica a autenticação
    const receivedToken = req.headers['x-hub-signature'];
    // Faça aqui a validação adequada do token recebido, comparando com o token esperado

    if (receivedToken !== githubToken) {
        return res.status(403).send('Token de acesso inválido');
    }

    const push = req.body;
    console.log(`I got some JSON (${numReq}):`, push);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
