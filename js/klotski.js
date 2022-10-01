const divs = document.querySelectorAll(".casa");
const end_game = document.querySelector(".end-game");
let casas = [];
for (let i = 0; i < 9; i++){
    casas[i] = divs[i];
}

let pecas = [
    1,2,3,
    4,5,6,
    7,0,8
];

let indice_zero = pecas.indexOf(0);

embaralharPecas();

document.addEventListener('keydown', (event) => {
    let tecla = event.key;
    let casa = casas[indice_zero];
    
    if (casa.innerHTML == ''){
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
    verificar();
});

const verificar = () => {
    let verifica = 0;
    for (let i = 0; i < 8; i++){
        if (pecas[i] == (i+1) && indice_zero == 8){
            verifica++;
        }
    }
    if (verifica == 8){
        end_game.style.display = 'flex';
        reiniciar();
    } else {
        verifica = 0;
    }
}

// Cronometro??

const reiniciar = () => {
    document.querySelector("#reiniciar").onclick = () => {
        end_game.style.display = 'none'
        embaralharPecas();
    };
}

function embaralharPecas(){
    for (let i = 0; i < casas.length; i++){
        const x = Math.floor(Math.random() * (i + 1));
        [pecas[i], pecas[x]] = [pecas[x], pecas[i]];
        [casas[i].innerText, casas[x].innerText] = [pecas[i], pecas[x]];
        indice_zero = pecas.indexOf(0);
        
        if (casas[i].classList.contains("bloco-vazio")){
            casas[i].classList.replace("bloco-vazio", "bloco");
        }
        
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
    if (indice_zero != a && indice_zero != b && indice_zero != c){
        casas[idx].classList.replace("bloco", "bloco-vazio");
        casas[indice_zero].classList.replace("bloco-vazio", "bloco");

        casas[indice_zero].innerText = casas[idx].innerText;
        casas[idx].innerText = '';

        pecas[indice_zero] = parseInt(casas[indice_zero].innerText);
        pecas[idx] = 0;
        
        indice_zero = pecas.indexOf(0);
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