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
        switch(tecla){
            case 'ArrowRight':
                moverDireita();
            case 'ArrowLeft':
                moverEsquerda();

        }
        
    }
})

const trocarCasas = (idx, a, b, c) => {
    if (indice != a && indice != b && indice != c){
        console.log('indice '+indice);
        console.log('idx '+idx);
        casas[idx].classList.add("bloco-vazio");
        casas[indice].classList.add("bloco");
        
        casas[idx].classList.remove("bloco");
        casas[indice].classList.remove("bloco-vazio");

        casas[indice].innerText = casas[idx].innerText;
        casas[idx].innerText = '';

        pecas[indice] = parseInt(casas[indice].innerText);
        pecas[idx] = 0;
        indice = pecas.indexOf(0);
        console.log(pecas);
        console.log('indice '+indice);
        console.log('idx '+idx);
    }
}

const moverDireita = () => {
    return trocarCasas(indice-1, 0, 3, 6);
}

const moverEsquerda = () => {
    return trocarCasas(indice+1, 2, 5, 8);
}
        