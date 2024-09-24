const carro = document.getElementById('carro');
const frenarButton = document.getElementById('frenar');
const reiniciarButton = document.getElementById('reiniciar');
const iniciarButton = document.getElementById('iniciar');
const calcularButton = document.getElementById('calcular');
const masaInput = document.getElementById('masa');
const fuerzaInput = document.getElementById('fuerza');
const aceleracionDisplay = document.getElementById('aceleracion');

let velocidad = 0;
let posY = 100; // Posición inicial del carro
let intervalo;

// Obtener la altura del contenedor de simulación
const simulacion = document.getElementById('simulacion');
const alturaContenedor = simulacion.clientHeight;

function calcularAceleracion() {
    const masa = parseFloat(masaInput.value);
    const fuerza = parseFloat(fuerzaInput.value);
    const aceleracion = fuerza / masa;
    aceleracionDisplay.textContent = aceleracion.toFixed(2); // Actualiza la aceleración mostrada
    return aceleracion;
}

function moverCarro() {
    const aceleracion = calcularAceleracion();
    intervalo = setInterval(() => {
        velocidad += aceleracion; // Incrementa la velocidad
        posY += velocidad; // Movimiento vertical
        carro.style.bottom = posY + 'px'; // Actualiza la posición del carro

        // Reiniciar el carro si llega al borde superior
        if (posY >= alturaContenedor) {
            posY = 100; // Reinicia la posición a 100px
            velocidad = 0; // Reinicia la velocidad
        }

        // Detener el carro si llega al borde inferior
        if (posY <= 0) {
            clearInterval(intervalo);
            posY = 0; // Asegúrate de que no se salga del contenedor
            carro.style.bottom = posY + 'px'; // Actualiza la posición del carro
        }
    }, 100);
}

calcularButton.addEventListener('click', () => {
    calcularAceleracion();
});

iniciarButton.addEventListener('click', () => {
    velocidad = 0; // Reinicia la velocidad
    moverCarro();
});

reiniciarButton.addEventListener('click', () => {
    clearInterval(intervalo); // Detener el movimiento
    velocidad = 0; // Resetear velocidad
    posY = 100; // Reiniciar posición
    carro.style.bottom = posY + 'px'; // Actualizar posición del carro
});

// Establecer el carro en posición inicial
carro.style.bottom = posY + 'px';
