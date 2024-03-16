const express = require('express');
const { PORT_3 } = require('../utils');
const { database3 } = require('../database');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json(database3);
});

app.listen(PORT_3, () => {
  console.log(`Servidor 3 em execução na porta ${PORT_3}`);
});