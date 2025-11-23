// Panel de Juegos - Hans Zimmer

// Selección de juegos
document.querySelectorAll('.tarjeta-juego').forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
        const juegoId = tarjeta.getAttribute('data-juego');
        mostrarJuego(juegoId);
    });
});

function mostrarJuego(juegoId) {
    // Ocultar todas las zonas de juego
    document.querySelectorAll('.zona-juego').forEach(zona => {
        zona.classList.remove('activo');
    });

    // Remover clase activo de todas las tarjetas
    document.querySelectorAll('.tarjeta-juego').forEach(tarjeta => {
        tarjeta.classList.remove('activo');
    });

    // Mostrar el juego seleccionado
    const zonaJuego = document.getElementById(`juego-${juegoId}`);
    if (zonaJuego) {
        zonaJuego.classList.add('activo');

        // Inicializar el juego correspondiente
        if (juegoId === 'memoria') {
            iniciarJuegoMemoria();
        } else if (juegoId === 'quiz') {
            iniciarQuiz();
        } else if (juegoId === 'soundtrack') {
            iniciarJuegoSoundtrack();
        }

        // Scroll suave al juego
        zonaJuego.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Botones para volver al menú
document.querySelectorAll('[id^="volver-menu"]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.zona-juego').forEach(zona => {
            zona.classList.remove('activo');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ==================== JUEGO DE MEMORIA ====================
let cartasMemoria = [];
let cartaVolteada = null;
let bloqueado = false;
let movimientos = 0;
let parejasEncontradas = 0;

const simbolosMusica = ['🎵', '🎶', '🎼', '🎹', '🎸', '🎺', '🎻', '🥁'];

function iniciarJuegoMemoria() {
    cartasMemoria = [];
    cartaVolteada = null;
    bloqueado = false;
    movimientos = 0;
    parejasEncontradas = 0;

    document.getElementById('movimientos-memoria').textContent = '0';
    document.getElementById('parejas-memoria').textContent = '0/8';
    document.getElementById('mensaje-memoria').style.display = 'none';

    crearTableroMemoria();
}

function crearTableroMemoria() {
    const tablero = document.getElementById('tablero-memoria');
    tablero.innerHTML = '';

    // Crear parejas y mezclar
    const parejas = [...simbolosMusica, ...simbolosMusica];
    const mezcladas = parejas.sort(() => Math.random() - 0.5);

    mezcladas.forEach((simbolo, index) => {
        const carta = document.createElement('div');
        carta.className = 'carta-memoria';
        carta.dataset.simbolo = simbolo;
        carta.dataset.index = index;
        carta.textContent = '?';
        carta.addEventListener('click', () => voltearCarta(carta));
        tablero.appendChild(carta);
        cartasMemoria.push(carta);
    });
}

function voltearCarta(carta) {
    if (bloqueado || carta.classList.contains('volteada') || carta.classList.contains('emparejada')) {
        return;
    }

    carta.classList.add('volteada');
    carta.textContent = carta.dataset.simbolo;

    if (!cartaVolteada) {
        cartaVolteada = carta;
    } else {
        bloqueado = true;
        movimientos++;
        document.getElementById('movimientos-memoria').textContent = movimientos;

        if (carta.dataset.simbolo === cartaVolteada.dataset.simbolo) {
            // Pareja encontrada
            setTimeout(() => {
                carta.classList.add('emparejada');
                cartaVolteada.classList.add('emparejada');
                parejasEncontradas++;
                document.getElementById('parejas-memoria').textContent = `${parejasEncontradas}/8`;

                cartaVolteada = null;
                bloqueado = false;

                if (parejasEncontradas === 8) {
                    mostrarMensaje('mensaje-memoria', `¡Felicidades! Completaste el juego en ${movimientos} movimientos 🎉`);
                }
            }, 500);
        } else {
            // No coinciden
            setTimeout(() => {
                carta.classList.remove('volteada');
                cartaVolteada.classList.remove('volteada');
                carta.textContent = '?';
                cartaVolteada.textContent = '?';
                cartaVolteada = null;
                bloqueado = false;
            }, 1000);
        }
    }
}

document.getElementById('reiniciar-memoria')?.addEventListener('click', iniciarJuegoMemoria);

// ==================== QUIZ DE HANS ZIMMER ====================
const preguntasQuiz = [
    {
        pregunta: "¿En qué año nació Hans Zimmer?",
        opciones: ["1957", "1963", "1970", "1975"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál fue la primera película importante de Hans Zimmer?",
        opciones: ["El Rey León", "Rain Man", "Gladiador", "Inception"],
        correcta: 1
    },
    {
        pregunta: "¿Por qué película ganó Hans Zimmer su primer Oscar?",
        opciones: ["Gladiador", "El Rey León", "Dunkerque", "Interstellar"],
        correcta: 1
    },
    {
        pregunta: "¿Con qué director ha colaborado más frecuentemente Hans Zimmer?",
        opciones: ["Steven Spielberg", "Christopher Nolan", "Ridley Scott", "James Cameron"],
        correcta: 1
    },
    {
        pregunta: "¿Qué instrumento NO es común en las composiciones de Hans Zimmer?",
        opciones: ["Sintetizadores", "Piano", "Arpa clásica", "Percusión tribal"],
        correcta: 2
    },
    {
        pregunta: "¿En qué ciudad nació Hans Zimmer?",
        opciones: ["Berlín", "Múnich", "Fráncfort", "Hamburgo"],
        correcta: 2
    },
    {
        pregunta: "¿Cuál de estas películas NO tiene música de Hans Zimmer?",
        opciones: ["Piratas del Caribe", "El Señor de los Anillos", "Batman: El Caballero de la Noche", "Dune"],
        correcta: 1
    },
    {
        pregunta: "¿Qué característica define el estilo de Hans Zimmer?",
        opciones: ["Solo música orquestal clásica", "Fusión de electrónica y orquesta", "Jazz experimental", "Música coral religiosa"],
        correcta: 1
    },
    {
        pregunta: "¿Para qué saga de superhéroes compuso la música Hans Zimmer?",
        opciones: ["Vengadores", "Batman de Nolan", "Superman de los 80", "X-Men"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál es una de las colaboraciones más recientes de Hans Zimmer?",
        opciones: ["Avatar 2", "Dune", "Star Wars", "Jurassic World"],
        correcta: 1
    }
];

let preguntaActual = 0;
let puntosQuiz = 0;

function iniciarQuiz() {
    preguntaActual = 0;
    puntosQuiz = 0;
    document.getElementById('puntos-quiz').textContent = '0';
    document.getElementById('mensaje-quiz').style.display = 'none';
    document.getElementById('siguiente-pregunta').style.display = 'none';
    document.getElementById('reiniciar-quiz').style.display = 'none';
    mostrarPregunta();
}

function mostrarPregunta() {
    if (preguntaActual >= preguntasQuiz.length) {
        finalizarQuiz();
        return;
    }

    const pregunta = preguntasQuiz[preguntaActual];
    document.getElementById('pregunta-actual').textContent = preguntaActual + 1;
    document.getElementById('total-preguntas').textContent = preguntasQuiz.length;
    document.getElementById('texto-pregunta').textContent = pregunta.pregunta;

    const contenedorOpciones = document.getElementById('opciones-quiz');
    contenedorOpciones.innerHTML = '';

    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.className = 'opcion-quiz';
        boton.textContent = opcion;
        boton.addEventListener('click', () => verificarRespuesta(index, pregunta.correcta, boton));
        contenedorOpciones.appendChild(boton);
    });
}

function verificarRespuesta(seleccionada, correcta, botonSeleccionado) {
    const botones = document.querySelectorAll('.opcion-quiz');
    botones.forEach(btn => btn.style.pointerEvents = 'none');

    if (seleccionada === correcta) {
        botonSeleccionado.classList.add('correcta');
        puntosQuiz += 10;
        document.getElementById('puntos-quiz').textContent = puntosQuiz;
    } else {
        botonSeleccionado.classList.add('incorrecta');
        botones[correcta].classList.add('correcta');
    }

    document.getElementById('siguiente-pregunta').style.display = 'inline-flex';
}

document.getElementById('siguiente-pregunta')?.addEventListener('click', () => {
    preguntaActual++;
    document.getElementById('siguiente-pregunta').style.display = 'none';
    const botones = document.querySelectorAll('.opcion-quiz');
    botones.forEach(btn => {
        btn.style.pointerEvents = 'auto';
        btn.classList.remove('correcta', 'incorrecta');
    });
    mostrarPregunta();
});

function finalizarQuiz() {
    const porcentaje = (puntosQuiz / (preguntasQuiz.length * 10)) * 100;
    let mensaje = `¡Quiz completado! Puntuación: ${puntosQuiz}/${preguntasQuiz.length * 10} (${porcentaje.toFixed(0)}%)`;

    if (porcentaje === 100) {
        mensaje += ' 🏆 ¡Perfecto! Eres un experto en Hans Zimmer!';
    } else if (porcentaje >= 70) {
        mensaje += ' 🎵 ¡Excelente conocimiento!';
    } else if (porcentaje >= 50) {
        mensaje += ' 👍 ¡Buen trabajo!';
    } else {
        mensaje += ' 📚 Sigue aprendiendo sobre Hans Zimmer';
    }

    mostrarMensaje('mensaje-quiz', mensaje);
    document.getElementById('contenedor-pregunta').style.display = 'none';
    document.getElementById('reiniciar-quiz').style.display = 'inline-flex';
}

document.getElementById('reiniciar-quiz')?.addEventListener('click', () => {
    document.getElementById('contenedor-pregunta').style.display = 'block';
    iniciarQuiz();
});

// ==================== JUEGO DE CONECTAR SOUNDTRACKS ====================
const soundtracks = [
    { soundtrack: "Time", pelicula: "Inception" },
    { soundtrack: "Now We Are Free", pelicula: "Gladiador" },
    { soundtrack: "Circle of Life", pelicula: "El Rey León" },
    { soundtrack: "He's a Pirate", pelicula: "Piratas del Caribe" },
    { soundtrack: "Cornfield Chase", pelicula: "Interstellar" },
    { soundtrack: "Why So Serious?", pelicula: "The Dark Knight" }
];

let seleccionActual = null;
let conexiones = [];

function iniciarJuegoSoundtrack() {
    seleccionActual = null;
    conexiones = [];
    document.getElementById('aciertos-soundtrack').textContent = '0/6';
    document.getElementById('mensaje-soundtrack').style.display = 'none';
    crearTableroSoundtrack();
}

function crearTableroSoundtrack() {
    const tablero = document.getElementById('tablero-soundtrack');
    tablero.innerHTML = '';

    // Mezclar películas
    const peliculasMezcladas = soundtracks.map(s => s.pelicula).sort(() => Math.random() - 0.5);

    soundtracks.forEach((item, index) => {
        const fila = document.createElement('div');
        fila.className = 'soundtrack-item';

        const divSoundtrack = document.createElement('div');
        divSoundtrack.className = 'soundtrack-titulo';
        divSoundtrack.textContent = item.soundtrack;
        divSoundtrack.dataset.soundtrack = item.soundtrack;
        divSoundtrack.addEventListener('click', () => seleccionarElemento(divSoundtrack, 'soundtrack'));

        const divLinea = document.createElement('div');
        divLinea.className = 'linea-conexion';
        divLinea.textContent = '↔';

        const divPelicula = document.createElement('div');
        divPelicula.className = 'pelicula-opcion';
        divPelicula.textContent = peliculasMezcladas[index];
        divPelicula.dataset.pelicula = peliculasMezcladas[index];
        divPelicula.addEventListener('click', () => seleccionarElemento(divPelicula, 'pelicula'));

        fila.appendChild(divSoundtrack);
        fila.appendChild(divLinea);
        fila.appendChild(divPelicula);
        tablero.appendChild(fila);
    });
}

function seleccionarElemento(elemento, tipo) {
    if (seleccionActual && seleccionActual.tipo === tipo) {
        // Deseleccionar si es del mismo tipo
        seleccionActual.elemento.classList.remove('seleccionado');
        seleccionActual = null;
        return;
    }

    if (!seleccionActual) {
        // Primera selección
        elemento.classList.add('seleccionado');
        seleccionActual = { elemento, tipo, valor: elemento.dataset[tipo] };
    } else {
        // Segunda selección - crear conexión
        const primerElemento = seleccionActual;
        elemento.classList.add('seleccionado');

        setTimeout(() => {
            // Intercambiar valores
            const tempTexto = elemento.textContent;
            const tempDataset = elemento.dataset[tipo];

            elemento.textContent = primerElemento.elemento.textContent;
            elemento.dataset[tipo] = primerElemento.elemento.dataset[primerElemento.tipo];

            primerElemento.elemento.textContent = tempTexto;
            primerElemento.elemento.dataset[primerElemento.tipo] = tempDataset;

            // Limpiar selección
            elemento.classList.remove('seleccionado');
            primerElemento.elemento.classList.remove('seleccionado');
            seleccionActual = null;
        }, 300);
    }
}

document.getElementById('verificar-soundtrack')?.addEventListener('click', () => {
    let aciertos = 0;
    const filas = document.querySelectorAll('.soundtrack-item');

    filas.forEach(fila => {
        const soundtrack = fila.querySelector('.soundtrack-titulo').dataset.soundtrack;
        const pelicula = fila.querySelector('.pelicula-opcion').dataset.pelicula;

        const correcto = soundtracks.find(s => s.soundtrack === soundtrack && s.pelicula === pelicula);

        if (correcto) {
            aciertos++;
            fila.style.background = 'rgba(40, 167, 69, 0.2)';
            fila.style.borderColor = '#28a745';
        } else {
            fila.style.background = 'rgba(220, 53, 69, 0.2)';
            fila.style.borderColor = '#dc3545';
        }
    });

    document.getElementById('aciertos-soundtrack').textContent = `${aciertos}/6`;

    let mensaje = '';
    if (aciertos === 6) {
        mensaje = '🏆 ¡Perfecto! Conoces todas las bandas sonoras de Hans Zimmer';
    } else if (aciertos >= 4) {
        mensaje = `🎵 ¡Muy bien! ${aciertos} de 6 correctas`;
    } else {
        mensaje = `📚 ${aciertos} de 6 correctas. ¡Sigue intentándolo!`;
    }

    mostrarMensaje('mensaje-soundtrack', mensaje);
});

document.getElementById('reiniciar-soundtrack')?.addEventListener('click', iniciarJuegoSoundtrack);

// ==================== UTILIDADES ====================
function mostrarMensaje(elementoId, texto) {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.textContent = texto;
        elemento.style.display = 'block';
    }
}
