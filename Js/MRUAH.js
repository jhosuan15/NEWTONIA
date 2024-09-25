// Obtener referencias a los elementos del DOM
const calcularBtn = document.getElementById('calcular');
const objetoMRUA = document.getElementById('objeto-mrua');
const iniciarSimulacionBtn = document.getElementById('iniciar-simulacion');
const reiniciarSimulacionBtn = document.getElementById('reiniciar-simulacion');
const opcionCalculo = document.getElementById('opcion-calculo');
const velocidadInicialInput = document.getElementById('velocidad-inicial');
const velocidadFinalInput = document.getElementById('velocidad-final');
const aceleracionInput = document.getElementById('aceleracion');
const tiempoInput = document.getElementById('tiempo');
const distanciaInput = document.getElementById('distancia');
const resultadoP = document.getElementById('resultado');

function actualizarInputs() {
    const seleccion = opcionCalculo.value;

    // Ocultar todos los inputs inicialmente
    [distanciaInput, tiempoInput, velocidadInicialInput, velocidadFinalInput, aceleracionInput].forEach(input => {
        input.style.display = 'none';
    });

    // Mostrar inputs según la opción seleccionada
    if (seleccion === 'velocidad') {
        velocidadInicialInput.style.display = 'block';
        aceleracionInput.style.display = 'block';
        tiempoInput.style.display = 'block';
    } else if (seleccion === 'distancia') {
        velocidadInicialInput.style.display = 'block';
        aceleracionInput.style.display = 'block';
        tiempoInput.style.display = 'block';
    } else if (seleccion === 'tiempo') {
        velocidadInicialInput.style.display = 'block';
        aceleracionInput.style.display = 'block';
        distanciaInput.style.display = 'block';
    } else if (seleccion === 'aceleracion') {
        velocidadInicialInput.style.display = 'block';
        distanciaInput.style.display = 'block';
        tiempoInput.style.display = 'block';
    } else if (seleccion === 'velocidad-inicial') {
        aceleracionInput.style.display = 'block';
        distanciaInput.style.display = 'block';
        tiempoInput.style.display = 'block';
    } else if (seleccion === 'velocidad-final') {
        velocidadFinalInput.style.display = 'block';
        aceleracionInput.style.display = 'block';
        tiempoInput.style.display = 'block';
        distanciaInput.style.display = 'block';
        velocidadInicialInput.style.display = 'block';
    }
}

// Llamar a la función al cargar la página y al cambiar la opción seleccionada
actualizarInputs();
opcionCalculo.addEventListener('change', actualizarInputs);

calcularBtn.addEventListener('click', () => {
    const seleccion = opcionCalculo.value;
    const velocidadInicial = parseFloat(velocidadInicialInput.value);
    const velocidadFinal = parseFloat(velocidadFinalInput.value);
    const aceleracion = parseFloat(aceleracionInput.value);
    const tiempo = parseFloat(tiempoInput.value);
    const distancia = parseFloat(distanciaInput.value);
    
    // Realiza cálculos según la opción seleccionada
    if (seleccion === 'velocidad') {
        if (!isNaN(velocidadInicial) && !isNaN(aceleracion) && !isNaN(tiempo)) {
            const velocidadCalculada = velocidadInicial + (aceleracion * tiempo);
            resultadoP.innerText = `La velocidad final es: ${velocidadCalculada.toFixed(2)} m/s`;
        } else {
            resultadoP.innerText = `Por favor, ingrese todos los valores necesarios.`;
        }
    } else if (seleccion === 'distancia') {
        if (!isNaN(velocidadInicial) && !isNaN(aceleracion) && !isNaN(tiempo)) {
            const distanciaCalculada = (velocidadInicial * tiempo) + (0.5 * aceleracion * tiempo ** 2);
            resultadoP.innerText = `La distancia recorrida es: ${distanciaCalculada.toFixed(2)} m`;
        } else {
            resultadoP.innerText = `Por favor, ingrese todos los valores necesarios.`;
        }
    } else if (seleccion === 'tiempo') {
        if (!isNaN(velocidadInicial) && !isNaN(aceleracion) && !isNaN(distancia)) {
            const tiempoCalculado = (Math.sqrt((velocidadInicial ** 2) + (2 * aceleracion * distancia)) - velocidadInicial) / aceleracion;
            resultadoP.innerText = `El tiempo necesario es: ${tiempoCalculado.toFixed(2)} s`;
        } else {
            resultadoP.innerText = `Por favor, ingrese todos los valores necesarios.`;
        }
    } else if (seleccion === 'aceleracion') {
        if (!isNaN(velocidadInicial) && !isNaN(distancia) && !isNaN(tiempo)) {
            const aceleracionCalculada = (distancia - (velocidadInicial * tiempo)) / (0.5 * tiempo ** 2);
            resultadoP.innerText = `La aceleración es: ${aceleracionCalculada.toFixed(2)} m/s²`;
        } else {
            resultadoP.innerText = `Por favor, ingrese todos los valores necesarios.`;
        }
    } else if (seleccion === 'velocidad-inicial') {
        if (!isNaN(aceleracion) && !isNaN(distancia) && !isNaN(tiempo)) {
            const velocidadInicialCalculada = distancia / tiempo - (0.5 * aceleracion * tiempo);
            resultadoP.innerText = `La velocidad inicial es: ${velocidadInicialCalculada.toFixed(2)} m/s`;
        } else {
            resultadoP.innerText = `Por favor, ingrese todos los valores necesarios.`;
        }
    } else if (seleccion === 'velocidad-final') {
        if (!isNaN(velocidadInicial) && !isNaN(aceleracion) && !isNaN(tiempo)) {
            const velocidadFinalCalculada = velocidadInicial + (aceleracion * tiempo);
            resultadoP.innerText = `La velocidad final es: ${velocidadFinalCalculada.toFixed(2)} m/s`;
        } else {
            resultadoP.innerText = `Por favor, ingrese todos los valores necesarios.`;
        }
    }
});

// Lógica para la simulación
iniciarSimulacionBtn.addEventListener('click', () => {
    const velocidadInicial = parseFloat(velocidadInicialInput.value);
    const aceleracion = parseFloat(aceleracionInput.value);
    const tiempo = parseFloat(tiempoInput.value);

    if (!isNaN(velocidadInicial) && !isNaN(aceleracion) && !isNaN(tiempo)) {
        const totalDistancia = (velocidadInicial * tiempo) + (0.5 * aceleracion * tiempo ** 2);
        objetoMRUA.style.transition = `transform ${tiempo}s linear`;
        objetoMRUA.style.transform = `translateX(${totalDistancia}px)`;
    } else {
        alert('Por favor, ingrese valores válidos para la simulación.');
    }
});

reiniciarSimulacionBtn.addEventListener('click', () => {
    objetoMRUA.style.transform = `translateX(0)`;
    resultadoP.innerText = '';
});
