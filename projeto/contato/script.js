const express = require('express');
const app = express();
const port = 3000;

let messages = [
    { id: 1, sender: 'fulano@gmail.com', message: 'Olá, tudo bem?' },
    { id: 2, sender: 'ciclano@gmail.com', message: 'Tenho uma dúvida sobre o produto.' }
];

app.use(express.json());
app.use(express.static('public'));

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    const { email, subject, message } = req.body;
    const newMessage = {
        id: messages.length + 1,
        sender: email,
        message: `${subject}: ${message}`
    };
    messages.push(newMessage);
    res.sendStatus(201);
});

app.post('/reply', (req, res) => {
    const { id, reply } = req.body;
    console.log(`Resposta para mensagem ${id}: ${reply}`);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
