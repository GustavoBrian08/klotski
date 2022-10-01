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
// Embaralhar as peças!

const reiniciar = () => {
    document.querySelector("#reiniciar").onclick = () => end_game.style.display = 'none';
}

const trocarCasas = (idx, a, b, c) => {
    if (indice_zero != a && indice_zero != b && indice_zero != c){
        casas[idx].classList.add("bloco-vazio");
        casas[indice_zero].classList.add("bloco");
        
        casas[idx].classList.remove("bloco");
        casas[indice_zero].classList.remove("bloco-vazio");

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