const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

const spreadsheetId = '1IFeDuSMgjfGjHN2uTw8ZiDolnBt4deZ8kGfAT8PyveQ';
const appScriptUrl = 'https://script.google.com/macros/s/AKfycbzr7zNb0yMi3ooMV2W9VU_Tcn1v-5EH986x5cXy3cekHQPC_t0rl7WM2SU3SfH7YR-F/exec';

// Função para definir um cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Função para obter um cookie
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

// Pergunta se o usuário deseja salvar o nome
function askToSaveName() {
    const lastName = getCookie('username');
    if (lastName) {
        nameInput.value = lastName;
    } else {
        const saveName = confirm('Deseja salvar seu nome para a próxima vez que acessar?');
        if (saveName) {
            const name = prompt('Digite seu nome:');
            if (name) {
                setCookie('username', name, 30); // Salva o nome por 30 dias
                nameInput.value = name;
            }
        }
    }
}

function fetchMessages() {
    fetch(`${appScriptUrl}?func=Read&spreadsheetId=${spreadsheetId}`)
        .then(response => response.json())
        .then(data => {
            chatMessages.innerHTML = ''; // Limpa as mensagens anteriores
            data.forEach(row => {
                const messageElement = document.createElement('div');
                messageElement.className = 'message'; // Adiciona a classe para estilização
                messageElement.innerHTML = `<span class="name">${row[1]}:</span> ${row[2]}`; // Nome e mensagem separados
                chatMessages.appendChild(messageElement);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para o final do chat
        })
        .catch(error => console.error('Erro ao obter mensagens:', error));
}

function sendMessage() {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (name && message) {
        // Envia o nome e a mensagem usando "|" como delimitador
        fetch(`${appScriptUrl}?func=Create&spreadsheetId=${spreadsheetId}&values=${name}|${message}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                messageInput.value = '';
                fetchMessages(); // Atualiza as mensagens após enviar
            })
            .catch(error => console.error('Erro ao enviar mensagem:', error));
    } else {
        alert('Por favor, preencha seu nome e a mensagem.');
    }
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Atualiza o chat a cada meio segundo
setInterval(fetchMessages, 500);

// Pergunta para salvar o nome ao carregar a página
askToSaveName();