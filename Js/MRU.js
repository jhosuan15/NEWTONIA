// Elementos del DOM
const calcularBtn = document.getElementById('calcular');
const resultadoP = document.getElementById('resultado');
const objetoMRU = document.getElementById('objeto-mru');
const iniciarSimulacionBtn = document.getElementById('iniciar-simulacion');
const reiniciarSimulacionBtn = document.getElementById('reiniciar-simulacion');
const vel = document.getElementById('velocidad');
const tem = document.getElementById('tiempo');
const dis = document.getElementById('distancia');
const formulaSeleccionada = document.getElementById('opcion-calculo');

// Inicialmente, ocultamos el campo de velocidad
vel.style.display = 'none';

// Evento para cambiar los inputs mostrados dependiendo de la selección
formulaSeleccionada.addEventListener('change', () => {
    const seleccion = formulaSeleccionada.value;

    // Mostrar u ocultar los campos de entrada según lo que se quiera calcular
    if (seleccion === 'distancia') {
        dis.style.display = 'none';
        tem.style.display = 'inline-block';
        vel.style.display = 'inline-block';
    } else if (seleccion === 'tiempo') {
        tem.style.display = 'none';
        dis.style.display = 'inline-block';
        vel.style.display = 'inline-block';
    } else {
        vel.style.display = 'none';
        dis.style.display = 'inline-block';
        tem.style.display = 'inline-block';
    }
});

// Variables para almacenar los valores calculados
let distancia, tiempo, velocidad;

// Función para calcular el valor basado en la opción seleccionada
calcularBtn.addEventListener('click', () => {
    distancia = parseFloat(document.getElementById('distancia').value);
    tiempo = parseFloat(document.getElementById('tiempo').value);
    
    const seleccion = formulaSeleccionada.value;

    if (seleccion === 'velocidad') {
        // Calcular la velocidad
        if (distancia > 0 && tiempo > 0) {
            velocidad = distancia / tiempo;
            resultadoP.textContent = `Velocidad: ${velocidad} m/s`;
        } else {
            resultadoP.textContent = 'Por favor, ingresa valores válidos para distancia y tiempo.';
        }
    } else if (seleccion === 'distancia') {
        velocidad = parseFloat(document.getElementById('velocidad').value);
        if (velocidad > 0 && tiempo > 0) {
            distancia = velocidad * tiempo;
            resultadoP.textContent = `Distancia: ${distancia} m`;
        } else {
            resultadoP.textContent = 'Por favor, ingresa valores válidos para velocidad y tiempo.';
        }
    } else if (seleccion === 'tiempo') {
        velocidad = parseFloat(document.getElementById('velocidad').value);
        if (distancia > 0 && velocidad > 0) {
            tiempo = distancia / velocidad;
            resultadoP.textContent = `Tiempo: ${tiempo} s`;
        } else {
            resultadoP.textContent = 'Por favor, ingresa valores válidos para distancia y velocidad.';
        }
    }
});

const simulador = document.querySelector('.simulador');

iniciarSimulacionBtn.addEventListener('click', () => {
    const seleccion = formulaSeleccionada.value;

    if ((seleccion === 'velocidad' && velocidad) ||
        (seleccion === 'distancia' && distancia && tiempo) ||
        (seleccion === 'tiempo' && tiempo && distancia)) {

        // Reseteamos la posición del objeto
        objetoMRU.style.left = '0px';

        // Ancho del contenedor y el objeto
        const contenedorAncho = simulador.clientWidth;
        const objetoAncho = objetoMRU.clientWidth;

        // Máxima distancia que la bola puede recorrer
        const maxDistanciaPx = contenedorAncho - objetoAncho;

        // Tiempo y distancia en metros
        const tiempoMs = tiempo * 1000; // Convertimos tiempo a milisegundos
        const distanciaPx = (distancia / 600) * maxDistanciaPx; // Ajustamos a píxeles según el tamaño del contenedor

        // Limitar la distancia recorrida al borde del contenedor
        const distanciaRecorridaPx = Math.min(distanciaPx, maxDistanciaPx);

        // Animamos el movimiento de la bola dentro del contenedor
        objetoMRU.style.transition = `left ${tiempo}s linear`;
        objetoMRU.style.left = `${distanciaRecorridaPx}px`;

        // Actualizar la distancia recorrida debajo de la bola
        const distanciaRealRecorrida = (distanciaRecorridaPx / maxDistanciaPx) * distancia; // Convertimos de nuevo a metros

    } else {
        alert('Primero calcula los valores necesarios.');
    }
});

reiniciarSimulacionBtn.addEventListener('click', () => {
    objetoMRU.style.transition = 'none'; // Detenemos la animación
    objetoMRU.style.left = '0px'; // Movemos al inicio
    distanciaRecorrida.textContent = '0 m'; // Reiniciamos la distancia mostrada
    resultadoP.textContent = ''; // Limpiamos el resultado
});
