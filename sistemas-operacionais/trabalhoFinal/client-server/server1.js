const express = require('express');

const normalize = require('../utils/normalize');
const { database1 } = require('../utils/database');
const { PORT_1, STATUS_NOT_FOUND } = require('../utils/variaveis');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json(database1);
});

app.get("/buscar/:key", async (req, res) => {
  let foundData = null;

  try {
    const query = req.params.key; // Obter termo de busca da URL
    const foundData = database1.filter(
      (item) =>
        normalize(item.titulo).includes(normalize(query)) ||
        normalize(item.autor).includes(normalize(query))
    ); // Filtrar dados
    if (foundData) {
      res.json(foundData);
      return; // Encerra a busca após encontrar o dado
    }
  } catch (error) {
    console.error("Erro ao buscar dados no servidor:", error);
  }

  if (!foundData) {
    res.status(STATUS_NOT_FOUND).json({ message: "Dado não encontrado" });
  }
});

app.listen(PORT_1, () => {
  console.log(`Servidor 1 em execução na porta ${PORT_1}`);
});
