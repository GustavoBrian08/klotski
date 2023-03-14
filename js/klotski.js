// PEGANDO ELEMENTOS DO DOM
const divs = document.querySelectorAll(".casa");
const end_game = document.querySelector(".end-game");
const tempo_tela = document.querySelector(".tela");
const mensagem_tempo = document.querySelector(".mensagem-tempo");

// DECLARANDO VARIÁVEIS
let cronometro;
let segundos = 0;
let minutos = 0;
let casas = [];

// PASSANDO ITENS DE UM NODELIST PARA UM ARRAY PARA MELHOR MANIPULAÇÃO
for (let i = 0; i < 9; i++){
    casas[i] = divs[i];
}

// PEÇAS DO JOGO REPRESENTADAS POR NÚMEROS EM UM ARRAY
let pecas = [
    1,2,3,
    4,5,6,
    7,0,8
];

let indice_zero = pecas.indexOf(0);

embaralharPecas();
comecarCronometro();

// ESCUTADOR PARA QUANDO UMA TECLA FOR PRESSIONADA
document.addEventListener('keydown', (event) => {
    let tecla = event.key; // pegando a tecla
    let casa = casas[indice_zero];
    
    if (casa.innerHTML == ''){
        // SE A TECLA FOR UMA DESSAS, EXECUTARÁ SUA RESPECTIVA FUNÇÃO
        switch(tecla){
            case 'ArrowRight':
                moverDireita();
                break;
            case 'ArrowLeft':
                moverEsquerda();
                break;
            case 'ArrowUp':
                moverCima();
                break;
            case 'ArrowDown':
                moverBaixo();
                break;
        }
    }
    verificarFim();
});

// ESCUTADOR PARA MOVIMENTAR POR CLIQUES DO MOUSE
document.addEventListener('click', (event) => {
    let pecaClicada = event.target.innerHTML;
    let casaAcima = casas[indice_zero - 3]; // pegando as casas baseadas na posição da peça zero
    let casaAbaixo = casas[indice_zero + 3];
    let casaEsquerda = casas[indice_zero - 1];
    let casaDireita = casas[indice_zero + 1];

    // SEMPRE NECESSÁRIO VERIFICAR SE A PEÇA É UNDEFINED
    if(casaAcima != undefined && pecaClicada == casaAcima.innerHTML){
        moverBaixo();
    } else if(casaAbaixo != undefined && pecaClicada == casaAbaixo.innerHTML){
        moverCima();
    } else if(casaEsquerda != undefined && pecaClicada == casaEsquerda.innerHTML){
        moverDireita();
    } else if(casaDireita != undefined && pecaClicada == casaDireita.innerHTML){
        moverEsquerda();
    }
    verificarFim();
});

function embaralharPecas(){
    for (let i = 0; i < casas.length; i++){
        const x = Math.floor(Math.random() * (i + 1)); // Pegando um número aleatório
        [pecas[i], pecas[x]] = [pecas[x], pecas[i]]; // Reordenando peças
        [casas[i].innerText, casas[x].innerText] = [pecas[i], pecas[x]]; // Reordenando casas com os valores em peças
        indice_zero = pecas.indexOf(0); // Atualizando o índice de zero
        
        // TROCANDO CLASSES DA PEÇA ANTERIOR
        if (casas[i].classList.contains("bloco-vazio")){
            casas[i].classList.replace("bloco-vazio", "bloco");
        }
        
        // TROCANDO CLASSES DA PEÇA QUE TEM O ÍNDICE DE ZERO
        if (casas[indice_zero].innerText == 0){
            casas[indice_zero].classList.replace("bloco", "bloco-vazio");
            casas[indice_zero].innerText = '';

            // TRATANDO UM BUG QUE NÃO ENTENDO PORQUE ACONTECE T-T
            let indice_8 = pecas.indexOf(8);
            if (casas[indice_8].innerText == 8){
                casas[indice_8].classList.replace("bloco-vazio", "bloco");
            }
        }
    }
    return casas, pecas, indice_zero;
}

const trocarCasas = (idx, a, b, c) => {
    if (indice_zero != a && indice_zero != b && indice_zero != c){ // Comparando os lados opostos da direção
        // TROCANDO CLASSES DAS PEÇAS QUE IRÃO SE MOVER
        casas[idx].classList.replace("bloco", "bloco-vazio");
        casas[indice_zero].classList.replace("bloco-vazio", "bloco");

        // TROCANDO O TEXTO DESSAS PEÇAS
        casas[indice_zero].innerText = casas[idx].innerText;
        casas[idx].innerText = '';

        // REORDENANDO O ARRAY PEÇAS DE ACORDO COM AS CASAS DO JOGO
        pecas[indice_zero] = parseInt(casas[indice_zero].innerText);
        pecas[idx] = 0;
        
        indice_zero = pecas.indexOf(0); // Atualizando o índice de zero
    }
}

const moverDireita = () => {
    return trocarCasas(indice_zero-1, 0, 3, 6);
}

const moverEsquerda = () => {
    return trocarCasas(indice_zero+1, 2, 5, 8);
}

const moverCima = () => {
    return trocarCasas(indice_zero+3, 6, 7, 8);
}

const moverBaixo = () => {
    return trocarCasas(indice_zero-3, 0, 1, 2);
}

function comecarCronometro(){
    cronometro = setInterval(() => { // Função executada entre intervalos de tempo determinado
        segundos++;
        if (segundos == 60){
            segundos = 0;
            minutos++;
        }
        tempo_tela.innerText = `${minutos < 10 ? `0${minutos}` : minutos}:${segundos < 10 ? `0${segundos}` : segundos}`;
    }, 1000); // Intervalo de 1000 milissegundos (1 segundo)
}

const pararCronometro = () => {
    clearInterval(cronometro);
    minutos = 00;
    segundos = 00;
}

const reiniciar = () => {
    document.querySelector("#reiniciar").onclick = () => {
        end_game.style.display = 'none' // A tela de fim de jogo some
        embaralharPecas();
        comecarCronometro();
    };
}

const verificarFim = () => {
    let verifica = 0;
    for (let i = 0; i < 8; i++){
        if (pecas[i] == (i+1) && indice_zero == 8){
            verifica++; // Variável necessaria para checar se os 8 itens do array estão nos lugares corretos
        }
    }
    if (verifica == 8){
        end_game.style.display = 'flex'; // A tela de fim de jogo aparece
        pararCronometro();
        mensagem_tempo.innerText = `seu tempo foi ${tempo_tela.innerText}!`; // Mensagem com o tempo de jogo
        reiniciar();
    } else {
        verifica = 0; // Se quando for verificada, não for igual a 8, então será zerada
    }
}