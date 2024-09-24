const pelota = document.getElementById('pelota');
const reiniciarButton = document.getElementById('reiniciar');
const iniciarButton = document.getElementById('iniciar');

let posX = 0; // Posición horizontal inicial de la pelota
let posY = 0; // Posición vertical inicial de la pelota
let animacionActiva = false; // Indica si la animación está en curso
let velocidadX = 0; // Velocidad horizontal
let velocidadY = 0; // Velocidad vertical
const gravedad = 0.5; // Gravedad para simular el movimiento hacia abajo
let intervalo; // Variable para el intervalo de animación

// Función para iniciar la animación
function iniciarAnimacion() {
    if (!animacionActiva) {
        animacionActiva = true; // Indica que la animación está activa
        posX = 0; // Reinicia la posición horizontal
        posY = 0; // Reinicia la posición vertical

        // Calcula una velocidad inicial para la pelota
        velocidadX = 15; // Velocidad horizontal inicial
        velocidadY = 15; // Velocidad vertical inicial

        // Inicia el movimiento de la pelota
        intervalo = setInterval(moverPelota, 20);
    }
}

// Función para mover la pelota
function moverPelota() {
    // Actualiza las posiciones
    posX += velocidadX;
    posY += velocidadY;

    // Aplica gravedad
    velocidadY -= gravedad; // La velocidad vertical disminuye

    // Comprueba si la pelota toca el suelo
    if (posY <= 0) {
        posY = 0; // Mantener en el suelo
        velocidadY = -velocidadY * 0.7; // Rebote con un coeficiente de restitución
    }

    // Comprueba límites de la pantalla
    if (posX >= document.getElementById('simulacion').clientWidth - pelota.offsetWidth) {
        posX = document.getElementById('simulacion').clientWidth - pelota.offsetWidth; // Mantener dentro de los límites
        velocidadX = -velocidadX * 0.7; // Rebote con un coeficiente de restitución
    } else if (posX <= 0) {
        posX = 0; // Mantener dentro de los límites
        velocidadX = -velocidadX * 0.7; // Rebote con un coeficiente de restitución
    }

    // Actualiza la posición de la pelota
    pelota.style.left = posX + 'px';
    pelota.style.bottom = posY + 'px';

    // Detener la animación si la velocidad es muy baja
    if (Math.abs(velocidadX) < 0.1 && Math.abs(velocidadY) < 0.1) {
        clearInterval(intervalo);
        animacionActiva = false; // La animación ha terminado
    }
}

// Reiniciar la simulación
reiniciarButton.addEventListener('click', () => {
    clearInterval(intervalo); // Detener cualquier movimiento
    posX = 0; // Reinicia la posición horizontal
    posY = 0; // Reinicia la posición vertical
    velocidadX = 0; // Reinicia la velocidad horizontal
    velocidadY = 0; // Reinicia la velocidad vertical
    pelota.style.left = posX + 'px'; // Aplica la posición reiniciada
    pelota.style.bottom = posY + 'px'; // Aplica la posición reiniciada
    animacionActiva = false; // Resetea el estado de animación
});

// Iniciar la animación al presionar el botón
iniciarButton.addEventListener('click', iniciarAnimacion);

// Establecer la pelota en posición inicial
pelota.style.left = posX + 'px';
pelota.style.bottom = posY + 'px';
