const readline = require('readline');
const axios = require('axios');
const { PORT_1, PORT_2, PORT_3, normalize } = require('../utils');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fifo = async () => {
    const links = [
    `http://localhost:${PORT_1}/`,
    `http://localhost:${PORT_2}/`,
    `http://localhost:${PORT_3}/`
    ]

    let serverData = [];

    links.forEach(async (link, index) => {
        const resposta = await axios.get(link);
        serverData.push(...resposta.data);
        if(index == 2){
            console.log(serverData);
        }
    });
}

const pipe = async () => {
    const links = [
    `http://localhost:${PORT_1}/`,
    `http://localhost:${PORT_2}/`,
    `http://localhost:${PORT_3}/`
    ]

    let serverData = [];

    links.forEach(async (link, index) => {
        const resposta = await axios.get(link);
        serverData.push(...resposta.data);
        if(index == 2){
            console.log(serverData);
        }
    });
}

const retornarTudo = async () => {
    try {
        const [response1, response2, response3] = await Promise.all([
            axios.get(`http://localhost:${PORT_1}/`),
            axios.get(`http://localhost:${PORT_2}/`),
            axios.get(`http://localhost:${PORT_3}/`),
        ]);

        const serverData = [...response1.data, ...response2.data, ...response3.data];

        console.log(serverData);
    } catch (error) {
        console.error('\nErro ao buscar dados do servidor:', error);
    }
};

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

rl.question('Para restornar toda a lista digite \'listar\'. \nPara buscar um unico elemento, digite \'unico\':\n >', async (resp) => {
    const normalizeResp = resp.toUpperCase();

    switch (normalizeResp) {
        case "LISTAR":
            await fifo();
            break;
        case "UNICO":
        default:
            rl.question('Digite o titulo da busca:\n >', async (titulo) => {
                await buscaUnica(titulo);
            })
            break;
    }
});