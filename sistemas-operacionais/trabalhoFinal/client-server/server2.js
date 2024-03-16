const express = require('express');
const { PORT_2 } = require('../utils');
const { database2 } = require('../database');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
   res.json(database2);
});

app.listen(PORT_2, () => {
   console.log(`Servidor 2 em execução na porta ${PORT_2}`);
});