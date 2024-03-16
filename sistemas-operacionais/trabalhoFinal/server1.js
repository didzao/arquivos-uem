const axios = require('axios');
const express = require('express');
const { database1 } = require('./database');
const { normalize, PORT_1, PORT_2, PORT_3, STATUS_ERROR, STATUS_NOT_FOUND } = require('./utils');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json(database1);
});

app.get('/all', async (req, res) => {
  try {
    const [response2, response3] = await Promise.all([
      axios.get(`http://localhost:${PORT_2}/`),
      axios.get(`http://localhost:${PORT_3}/`),
    ]);
    const allData = [...database1, ...response2.data, ...response3.data];
    res.json(allData);
  } catch (error) {
    console.error('Erro ao buscar dados dos servidores:', error);
    res.status(STATUS_ERROR).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/buscar/:key', async (req, res) => {
  let foundData = null;

  for (const serverUrl of [`http://localhost:${PORT_1}/`, `http://localhost:${PORT_2}/`, `http://localhost:${PORT_3}/`]) {
    try {
      const response = await axios.get(serverUrl);
      const serverData = response.data;

      foundData = serverData.find(item => normalize(item.titulo).includes(normalize(req.params.key)) || normalize(item.autor).includes(normalize(req.params.key)));
      if (foundData) {
        res.json(foundData);
        return; // Encerra a busca após encontrar o dado
      }
    } catch (error) {
      console.error('Erro ao buscar dados no servidor:', error);
    }
  }

  if (!foundData) {
    res.status(STATUS_NOT_FOUND).json({ message: 'Dado não encontrado' });
  }
});


app.listen(PORT_1, () => {
  console.log(`Servidor 1 escutando na porta ${PORT_1}`);
});
