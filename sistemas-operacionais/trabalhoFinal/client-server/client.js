const readline = require('readline');
const axios = require('axios');
const { PORT_1, PORT_2, PORT_3 } = require('../utils/variaveis');
const normalize = require('../utils/normalize');
const pipe = require('../utils/pipe');
const fifo = require('../utils/fifo');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const buscaUnica = async (titulo) => {
    for (const serverUrl of [`http://localhost:${PORT_1}/`, `http://localhost:${PORT_2}/`, `http://localhost:${PORT_3}/`]) {
        try {
            const response = await axios.get(serverUrl);
            const serverData = response.data;

            foundData = serverData.find(item => normalize(item.titulo).includes(normalize(titulo)));
            if (foundData) {
                console.log("Item encontrado!", foundData);
                return; // Encerra a busca após encontrar o dado
            }
            console.log(`Nenhum titulo com o termo ${titulo.toUpperCase()} foi encontrado!`);
        } catch (error) {
            console.error('Erro ao buscar dados no servidor:', error);
        }
    }
};

rl.question('Para retornar toda a lista usando fifo digite 1. \nPara retornar toda a lista usando pipe digite 2. \nPara buscar um unico elemento, usando semafaro, digite 3:\n >', async (resp) => {
    switch (resp) {
        case "1":
            await fifo();
            break;
        case "2":
            await pipe();
            break;
        case "3":
        default:
            rl.question('Digite o titulo da busca:\n >', async (titulo) => {
                await buscaUnica(titulo);
            })
            break;
    }
});