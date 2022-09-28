const divs = document.querySelectorAll(".casa");
let casas = [];
for (let i = 0; i < 9; i++){
    casas[i] = divs[i];
}

let pecas = [
    1,2,3,
    4,5,6,
    7,0,8
];

for (let i = 0; i < casas.length; i++){
    document.addEventListener('keydown', (event) => {
        let tecla = event.key;
        let casa = casas[i];
        const indice = pecas.indexOf(0);

        if (casa.innerHTML == ''){
            moverDireita(indice, tecla, casas);
        }
    })

    const moverDireita = (indice, tecla, casas) => {
        if (indice != 2 && indice != 5 && indice != 8 && tecla == 'ArrowRight'){
            casas[i] = indice+1
        }
    }
}