document.getElementById('opcion-calculo').addEventListener('change', function () {
    const opcionCalculo = this.value;
    const inputs = document.getElementById('inputs-dinamicos');

    // Limpiar inputs
    inputs.innerHTML = '';

    // Crear inputs según la opción seleccionada
    if (opcionCalculo === 'fuerza') {
        inputs.innerHTML += '<input type="number" id="masas" placeholder="Masa 1 (kg)" required />';
        inputs.innerHTML += '<input type="number" id="masa2" placeholder="Masa 2 (kg)" required />';
        inputs.innerHTML += '<input type="number" id="distancia" placeholder="Distancia (m)" required />';
    } else if (opcionCalculo === 'masa') {
        inputs.innerHTML += '<input type="number" id="fuerza" placeholder="Fuerza (N)" required />';
        inputs.innerHTML += '<input type="number" id="masa2" placeholder="Masa 2 (kg)" required />';
        inputs.innerHTML += '<input type="number" id="distancia" placeholder="Distancia (m)" required />';
    } else if (opcionCalculo === 'distancia') {
        inputs.innerHTML += '<input type="number" id="fuerza" placeholder="Fuerza (N)" required />';
        inputs.innerHTML += '<input type="number" id="masas" placeholder="Masa 1 (kg)" required />';
        inputs.innerHTML += '<input type="number" id="masa2" placeholder="Masa 2 (kg)" required />';
    }
});

document.getElementById('calcular').addEventListener('click', function () {
    const masa1 = parseFloat(document.getElementById('masas') ? document.getElementById('masas').value : 0);
    const masa2 = parseFloat(document.getElementById('masa2').value);
    const distancia = parseFloat(document.getElementById('distancia') ? document.getElementById('distancia').value : 0);
    const fuerza = parseFloat(document.getElementById('fuerza') ? document.getElementById('fuerza').value : 0);
    const resultado = document.getElementById('resultado');
    const manzana = document.getElementById('manzana');

    const G = 6.67430e-11; // Constante de gravitación universal

    // Verificar qué cálculo se necesita
    let fuerzaCalc, m1, r;

    const opcionCalculo = document.getElementById('opcion-calculo').value;

    switch (opcionCalculo) {
        case 'fuerza':
            // Comprobamos que todas las entradas son válidas
            if (isNaN(masa1) || isNaN(masa2) || isNaN(distancia) || masa1 <= 0 || masa2 <= 0 || distancia <= 0) {
                resultado.textContent = 'Por favor, ingresa valores válidos.';
                return;
            }
            // Cálculo de la fuerza
            fuerzaCalc = G * (masa1 * masa2) / Math.pow(distancia, 2);
            resultado.textContent = `La fuerza de atracción es: ${fuerzaCalc} N`;
            break;

        case 'masa':
            // Comprobamos que todas las entradas son válidas
            if (isNaN(fuerza) || isNaN(masa2) || masa2 <= 0 || distancia <= 0) {
                resultado.textContent = 'Por favor, ingresa valores válidos.';
                return;
            }
            // Despeje para masa 1
            m1 = (fuerza * Math.pow(distancia, 2)) / (G * masa2);
            resultado.textContent = `La masa necesaria es: ${m1} kg`;
            break;

        case 'distancia':
            // Comprobamos que todas las entradas son válidas
            if (isNaN(fuerza) || isNaN(masa1) || isNaN(masa2) || fuerza <= 0 || masa1 <= 0 || masa2 <= 0) {
                resultado.textContent = 'Por favor, ingresa valores válidos.';
                return;
            }
            // Despeje para la distancia
            r = Math.sqrt((G * masa1 * masa2) / fuerza);
            resultado.textContent = `La distancia necesaria es: ${r} m`;
            break;
    }

    // Simulación de caída
    manzana.style.display = 'block'; // Mostrar la manzana
    manzana.style.left = '75%'; // Mantener posición horizontal
    manzana.style.top = '16%'; // Mantener posición vertical inicial

    // Simulación de caída
    let caer = setInterval(() => {
        const currentTop = parseFloat(getComputedStyle(manzana).top);
        if (currentTop >= (460 - 100)) { // 600 es la altura total del simulador, 50 es la altura del césped
            clearInterval(caer);
        } else {
            manzana.style.top = `${currentTop + 5}px`; // Velocidad de caída
        }
    }, 100); // Intervalo de tiempo para la caída
});

document.getElementById('reiniciar').addEventListener('click', function () {
    document.getElementById('manzana').style.display = 'none';
    document.getElementById('resultado').textContent = '';
    document.getElementById('masas').value = '';
    document.getElementById('masa2').value = '';
    document.getElementById('distancia').value = '';
    document.getElementById('fuerza').value = '9.81'; // Reiniciar a la fuerza predeterminada
    document.getElementById('opcion-calculo').value = 'fuerza'; // Reiniciar a la opción por defecto
    document.getElementById('inputs-dinamicos').innerHTML = '<input type="number" id="masa2" placeholder="Masa 2 (kg)" required /><input type="number" id="fuerza" placeholder="Fuerza (N)" required /><input type="number" id="distancia" placeholder="Distancia (m)" required /><input type="number" id="masas" placeholder="Masa 1 (kg)" required />';
});
