const readline = require("readline");
const axios = require("axios").default;
const { PORT_1, PORT_2, PORT_3, normalize } = require("../utils");
const Semaphore = require("semaphore-async-await").default;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

        const dataVazio = Array.isArray(data) && data.length > 0;

        if (dataVazio) {
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

rl.question("Digite o titulo ou autor para buscar:\n >", (query) => {
  // Realiza a busca nos servidores
  buscarServidores(query).then((searchData) => {
    if (searchData) {
      console.log(`\n O termo \"${query}\" foi encontrado!\n`);
      console.log(searchData);
    } else {
      console.log(`\n O termo \"${query}\" não foi encontrado!`);
    }
  });
});
