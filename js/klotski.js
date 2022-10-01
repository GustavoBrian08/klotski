const divs = document.querySelectorAll(".casa");
let casas = [];
for (let i = 0; i < 9; i++){
    casas[i] = divs[i];
}

let pecas = [
    1,2,3,
    4,0,6,
    7,5,8
];

let indice = pecas.indexOf(0);

document.addEventListener('keydown', (event) => {
    let tecla = event.key;
    let casa = casas[indice];
    
    if (casa.innerHTML == ''){
        if (tecla == 'ArrowRight'){
            moverDireita();
        } else if (tecla == 'ArrowLeft'){
            moverEsquerda();
        } else if (tecla == 'ArrowUp'){
            moverCima();
        } else if (tecla == 'ArrowDown'){
            moverBaixo();
        }
    }
})

const trocarCasas = (idx, a, b, c) => {
    if (indice != a && indice != b && indice != c){
        casas[idx].classList.add("bloco-vazio");
        casas[indice].classList.add("bloco");
        
        casas[idx].classList.remove("bloco");
        casas[indice].classList.remove("bloco-vazio");

        casas[indice].innerText = casas[idx].innerText;
        casas[idx].innerText = '';

        pecas[indice] = parseInt(casas[indice].innerText);
        pecas[idx] = 0;
        
        indice = pecas.indexOf(0);
    }
}

const moverDireita = () => {
    return trocarCasas(indice-1, 0, 3, 6);
}

const moverEsquerda = () => {
    return trocarCasas(indice+1, 2, 5, 8);
}

const moverCima = () => {
    return trocarCasas(indice+3, 6, 7, 8);
}

const moverBaixo = () => {
    return trocarCasas(indice-3, 0, 1, 2);
}