// Seletor dos elementos da página
const clicksCounter = document.getElementById('clicks-counter');
const clicksPerMinuteDisplay = document.getElementById('clicks-per-minute');
const mouseLocationDisplay = document.getElementById('mouse-location');
const timerDisplay = document.getElementById('timer');
const dpiTimeDisplay = document.getElementById('dpi-time');
const gunshotSound = document.getElementById('gunshot-sound');
const birdsKilledDisplay = document.getElementById('birds-killed'); // Novo elemento para pássaros mortos

const normalModeBtn = document.getElementById('normal-mode');
const painterModeBtn = document.getElementById('painter-mode');
const dpiModeBtn = document.getElementById('dpi-mode');
const resetModeBtn = document.getElementById('reset-mode');
const soundToggleBtn = document.getElementById('sound-toggle');

const easyModeBtn = document.getElementById('easy-mode');
const mediumModeBtn = document.getElementById('medium-mode');
const hardModeBtn = document.getElementById('hard-mode');

let totalClicks = 0;
let correctClicks = 0;
let clicksPerMinute = 0;
let birdsKilled = 0; // Contador de pássaros mortos
let clickInterval;
let timerInterval;
let seconds = 0;
let minutes = 0;
let mode = 'normal';
let lastClickTime = Date.now();
let bolaInterval;
let bolaSpeed = 2000; // Velocidade padrão
let soundEnabled = true;
let manchas = []; // Armazena as manchas do modo pintor
let passaros = []; // Array para armazenar os pássaros
let passaroInterval; // Intervalo para criação de pássaros

// Velocidades para cada dificuldade
const difficultySpeeds = {
    easy: 2000,
    medium: 1500,
    hard: 1000
};

let currentDifficulty = 'easy'; // Dificuldade padrão

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    timerDisplay.textContent = `Tempo: ${formattedMinutes}:${formattedSeconds}`;
}

function startCounting() {
    document.body.addEventListener('click', countClicks);

    timerInterval = setInterval(updateTimer, 1000);

    clickInterval = setInterval(() => {
        clicksPerMinuteDisplay.textContent = `Cliques em 1 minuto: ${clicksPerMinute}`;
        clicksPerMinute = 0;
    }, 60000);
}

function resetMode() {
    totalClicks = 0;
    correctClicks = 0;
    clicksPerMinute = 0;
    seconds = 0;
    minutes = 0;
    birdsKilled = 0; // Resetar contador de pássaros mortos
    clicksCounter.textContent = `Total de cliques: ${totalClicks} | Certos: ${correctClicks}`;
    clicksPerMinuteDisplay.textContent = `Cliques em 1 minuto: ${clicksPerMinute}`;
    timerDisplay.textContent = `Tempo: 00:00`;
    dpiTimeDisplay.textContent = `Último tempo DPI: --`;
    birdsKilledDisplay.textContent = `Pássaros mortos: ${birdsKilled}`; // Atualizar exibição

    // Remove todas as manchas do modo pintor
    manchas.forEach(mancha => mancha.remove());
    manchas = [];

    // Remove todas as bolinhas da tela
    const bolinhas = document.querySelectorAll('.bolinha');
    bolinhas.forEach(bolinha => bolinha.remove());

    // Limpa o intervalo de bolinhas e pássaros, se existir
    clearInterval(bolaInterval);
    clearInterval(passaroInterval);

    // Remove todos os pássaros da tela
    passaros.forEach(passaro => passaro.remove());
    passaros = [];

    clearInterval(timerInterval);
    clearInterval(clickInterval);
    startCounting();
}

// Alternar entre modos
normalModeBtn.addEventListener('click', () => {
    mode = 'normal';
    resetMode();
    passaroInterval = setInterval(createPassaro, 2000); // Criar um pássaro a cada 2 segundos
});

painterModeBtn.addEventListener('click', () => {
    mode = 'painter';
    resetMode();
});

dpiModeBtn.addEventListener('click', () => {
    mode = 'dpi';
    resetMode();
    document.querySelector('.difficulty').style.display = 'block'; // Exibe os botões de dificuldade
    bolaSpeed = difficultySpeeds[currentDifficulty]; // Define a velocidade com base na dificuldade
    bolaInterval = setInterval(createBolinha, bolaSpeed);
});

function countClicks(event) {
    totalClicks++;
    clicksPerMinute++;

    clicksCounter.textContent = `Total de cliques: ${totalClicks} | Certos: ${correctClicks}`;
    mouseLocationDisplay.textContent = `Posição do mouse: (${event.clientX}, ${event.clientY})`;

    if (soundEnabled) {
        gunshotSound.currentTime = 0;
        gunshotSound.play();
    }

    if (mode === 'normal') {
        const tiro = document.createElement('div');
        tiro.classList.add('tiro');
        document.body.appendChild(tiro);
        tiro.style.left = `${event.clientX - 25}px`;
        tiro.style.top = `${event.clientY - 25}px`;

        // Verificar se o clique acertou um pássaro
        const passaroClicado = document.elementFromPoint(event.clientX, event.clientY);
        if (passaroClicado && passaroClicado.classList.contains('passaro')) {
            // Remover o pássaro
            passaroClicado.remove();
            passaros = passaros.filter(p => p !== passaroClicado); // Remove do array
            birdsKilled++; // Incrementar o contador de pássaros mortos
            birdsKilledDisplay.textContent = `Pássaros mortos: ${birdsKilled}`; // Atualizar exibição
        }

        // Remover o tiro após a animação
        setTimeout(() => {
            tiro.remove();
        }, 500);
    } else if (mode === 'painter') {
        const mancha = document.createElement('div');
        mancha.classList.add('mancha');
        document.body.appendChild(mancha);
        mancha.style.left = `${event.clientX - 30}px`;
        mancha.style.top = `${event.clientY - 30}px`;
        manchas.push(mancha); // Adiciona a mancha ao array
    } else if (mode === 'dpi') {
        const currentTime = Date.now();
        const responseTime = currentTime - lastClickTime;
        dpiTimeDisplay.textContent = `Último tempo DPI: ${responseTime} ms`;
        lastClickTime = currentTime;
    }
}

function createBolinha() {
    const bolinha = document.createElement('div');
    bolinha.classList.add('bolinha');

    // Definindo as dimensões do painel de informações
    const infoPanel = document.querySelector('.info');
    const infoPanelRect = infoPanel.getBoundingClientRect();

    // Calculando a posição da bolinha
    let x, y;
    do {
        x = Math.random() * (window.innerWidth - 40); // 40 é a largura da bolinha
        y = Math.random() * (window.innerHeight - 40); // 40 é a altura da bolinha
    } while (
        x + 30 > infoPanelRect.left && // 30 é a largura da bolinha
        x < infoPanelRect.right &&
        y + 30 > infoPanelRect.top && // 30 é a altura da bolinha
        y < infoPanelRect.bottom
    ); // Garante que a bolinha não apareça dentro do painel de informações

    bolinha.style.left = `${x}px`;
    bolinha.style.top = `${y}px`;
    document.body.appendChild(bolinha);

    // Remover a bolinha se não for clicada
    setTimeout(() => {
        if (document.body.contains(bolinha)) {
            bolinha.remove();
        }
    }, bolaSpeed);

    // Adicionar evento de clique à bolinha
    bolinha.addEventListener('click', () => {
        countClicks(event); // Chama a função de contagem de cliques
        bolinha.remove(); // Remove a bolinha ao ser clicada
    });
}

// Definir dificuldade
easyModeBtn.addEventListener('click', () => {
    currentDifficulty = 'easy';
    bolaSpeed = difficultySpeeds[currentDifficulty];
    clearInterval(bolaInterval);
    bolaInterval = setInterval(createBolinha, bolaSpeed);
});

mediumModeBtn.addEventListener('click', () => {
    currentDifficulty = 'medium';
    bolaSpeed = difficultySpeeds[currentDifficulty];
    clearInterval(bolaInterval);
    bolaInterval = setInterval(createBolinha, bolaSpeed);
});

hardModeBtn.addEventListener('click', () => {
    currentDifficulty = 'hard';
    bolaSpeed = difficultySpeeds[currentDifficulty];
    clearInterval(bolaInterval);
    bolaInterval = setInterval(createBolinha, bolaSpeed);
});

resetModeBtn.addEventListener('click', resetMode);

soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggleBtn.textContent = `Som: ${soundEnabled ? 'Ligado' : 'Desligado'}`;
});

startCounting();

function createPassaro() {
    const passaro = document.createElement('div');
    passaro.classList.add('passaro');
    document.body.appendChild(passaro);

    // Definir a posição inicial do pássaro
    passaro.style.left = '-50px'; // Fora da tela
    passaro.style.top = `${Math.random() * (window.innerHeight - 50)}px`; // Altura aleatória

    // Mover o pássaro
    const velocidade = Math.random() * 3 + 2; // Velocidade aleatória entre 2 e 5 segundos
    passaro.style.animationDuration = `${velocidade}s`;

    // Adicionar o pássaro ao array
    passaros.push(passaro);

    // Remover o pássaro após a animação
    setTimeout(() => {
        if (document.body.contains(passaro)) {
            passaro.remove();
            passaros = passaros.filter(p => p !== passaro);
        }
    }, velocidade * 1000);
}

// Adicione o intervalo de criação de pássaros ao iniciar o modo normal
normalModeBtn.addEventListener('click', () => {
    mode = 'normal';
    resetMode();
    passaroInterval = setInterval(createPassaro, 2000); // Criar um pássaro a cada 2 segundos
});