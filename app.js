const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Configurações de conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '*******',
  database: 'bd'
});

// Conectar ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem sucedida ao banco de dados MySQL');
});

// Rota para listar todos os clientes
app.get('/clientes', (req, res) => {
  connection.query('SELECT * FROM clientes', (error, results) => {
    if (error) {
      console.error('Erro ao buscar clientes:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.json(results);
  });
});

// Rota para cadastrar um novo cliente
app.post('/clientes', (req, res) => {
  console.log('Recebendo solicitação POST para /clientes');
  const { nome, email, telefone } = req.body;
  console.log('Dados do corpo da solicitação:', req.body);
  if (!nome || !email || !telefone) {
    console.log('Campos obrigatórios ausentes:', { nome, email, telefone });
    return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios' });
  }

  console.log('Todos os campos obrigatórios estão presentes. Iniciando inserção no banco de dados...');

  connection.query('INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)', [nome, email, telefone], (error, results) => {
    if (error) {
      console.error('Erro ao cadastrar cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }
    res.status(201).json({ message: 'Cliente cadastrado com sucesso' });
  });
});

// Iniciando o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
