import express from "express";
import contatos from "./data/contatos.mjs";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Endpoint raiz
app.get('/', (req, res) => {
    res.send(`
        <h1 style="color: red"> Olá Mundo! </h1>
        <p>Aula de Devops - Hand-on Docker </p>
    `);
});

// GET: /contatos
app.get('/contatos', (req, res) => {
    res.status(200).json({
        error: false,
        contatos
    });
});

// GET: /contatos/:id
app.get('/contatos/:id', (req, res) => {
    const id = req.params.id;
    const contato = contatos.find((contato) => contato.id == id);

    if (!contato) {
        return res.status(404).json({
            error: true,
            message: "Contato não encontrado!"
        });
    }
    res.status(200).json({
        error: false,
        contato
    });
});

// POST: /contatos
app.post('/contatos', (req, res) => {
    const contato = req.body;
    const { nome, genero, telefone, email } = contato;

    if (!nome || !genero || !telefone || !email) {
        return res.status(400).json({
            error: true,
            message: "Entrada inválida!"
        });
    }

    if (contatos.find((contato) => contato.email === email)) {
        return res.status(400).json({
            error: true,
            message: "Email já cadastrado!"
        });
    }

    const newContato = {
        id: uuidv4(),
        nome,
        genero, 
        telefone,
        email
    };

    contatos.push(newContato);
    
    res.status(201).json({
        error: false,
        contato: newContato
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}!`);
});
