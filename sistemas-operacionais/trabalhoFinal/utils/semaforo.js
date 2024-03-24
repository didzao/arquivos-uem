const axios = require("axios").default;
const Semaphore = require("semaphore-async-await").default;

const { PORT_1, PORT_2, PORT_3 } = require("./variaveis");

// URLs dos servidores
const urls = [
  `http://localhost:${PORT_1}/buscar`,
  `http://localhost:${PORT_2}/buscar`,
  `http://localhost:${PORT_3}/buscar`,
];

// Função para buscar dados de um servidor
const buscarDado = async (url, searchParam) => {
  try {
    console.log("\n***Buscando no servidor***: ", `${url}/${searchParam}`);

    const response = await axios.get(`${url}/${searchParam}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o dado:", error);

    return null;
  }
};

// Função para realizar a busca sequencial nos servidores
const buscarServidores = async (searchParam) => {
  const semaphore = new Semaphore(1);

  let searchData = null;

  for (const url of urls) {
    await semaphore.acquire();
    try {
      if (!searchData) {
        const data = await buscarDado(url, searchParam);

        const dataNaoVazio = Array.isArray(data) && data.length > 0;

        if (dataNaoVazio) {
          searchData = data;
        }
      }
    } finally {
      semaphore.release();
    }

    if (searchData) {
      break; // Se encontrou dados, encerra a busca
    }
  }

  return searchData;
};

module.exports = buscarServidores;

