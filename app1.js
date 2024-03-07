const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Simulando o banco de dados de clientes
let clientes = [];

// Rota para cadastrar um novo cliente
app.post('/clientes', (req, res) => {
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
  if (!nome || !email || !telefone || coordenada_x === undefined || coordenada_y === undefined) {
    return res.status(400).json({ error: 'Nome, email, telefone, coordenada_x e coordenada_y são obrigatórios' });
  }

  const novoCliente = { nome, email, telefone, coordenada_x, coordenada_y };
  clientes.push(novoCliente);
  res.status(201).json({ message: 'Cliente cadastrado com sucesso' });
});

// Rota para calcular a rota de visita dos clientes
app.get('/rota-visita', (req, res) => {
  // Aqui você pode implementar o algoritmo para calcular a rota mais eficiente
  // Por simplicidade, vamos apenas retornar a ordem dos clientes cadastrados
  const ordemVisita = clientes.map(cliente => cliente.nome);
  res.json(ordemVisita);
});

// Rota para visualizar todos os clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
