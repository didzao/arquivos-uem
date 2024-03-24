const axios = require('axios');
const readline = require('readline');

const pipe = require('../utils/pipe');
const fifo = require('../utils/fifo');
const buscarServidores = require('../utils/semaforo');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
            rl.question('Digite o titulo ou autor para buscar:\n >', async (query) => {
                buscarServidores(query).then((searchData) => {
                    if (searchData) {
                        console.log(`\n O termo \"${query}\" foi encontrado!\n`);
                        console.log(searchData);
                    } else {
                        console.log(`\n O termo \"${query}\" não foi encontrado!`);
                    }
                });
            })
            break;
    }
});