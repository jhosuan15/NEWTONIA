const carro = document.getElementById('carro');
const frenarButton = document.getElementById('frenar');
const reiniciarButton = document.getElementById('reiniciar');
const iniciarButton = document.getElementById('iniciar');

let velocidad = 0;
let posY = 620; // Inicializar en la posición de inicio (desde la parte superior)
let intervalo;

// Establecer el carro en posición inicial
carro.style.top = posY + 'px'; // Actualizar posición inicial

function moverCarro() {
    intervalo = setInterval(() => {
        posY -= velocidad; // Movimiento vertical hacia arriba
        carro.style.top = posY + 'px'; // Actualizar la posición del carro

        // Detener el carro si llega al borde superior
        if (posY <= 40 ) { // Cambiar a <= para reiniciar al llegar a la parte superior
            clearInterval(intervalo); // Detener el movimiento
            posY = 620; // Reiniciar posición
            carro.style.top = posY + 'px'; // Actualizar posición del carro
        }
    }, 100);
}

iniciarButton.addEventListener('click', () => {
    velocidad = 5; // Velocidad inicial
    moverCarro();
});

frenarButton.addEventListener('click', () => {
    velocidad = 0; // Detener el carro
});

reiniciarButton.addEventListener('click', () => {
    clearInterval(intervalo); // Detener el movimiento
    velocidad = 0; // Resetear velocidad
    posY = 620; // Reiniciar posición
    carro.style.top = posY + 'px'; // Actualizar posición del carro
});
