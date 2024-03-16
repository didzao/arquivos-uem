const express = require('express');
const { PORT_1 } = require('../utils');
const { database1 } = require('../database');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json(database1);
});

app.listen(PORT_1, () => {
  console.log(`Servidor 1 em execução na porta ${PORT_1}`);
});