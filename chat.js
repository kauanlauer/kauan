const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');
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
      chatMessages.innerHTML = '';
      data.forEach(row => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${row[1]}: ${row[2]}`;
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
    fetch(`${appScriptUrl}?func=Create&spreadsheetId=${spreadsheetId}&values=${name}|${message}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        messageInput.value = '';
        fetchMessages();
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

clearButton.addEventListener('click', () => {
  if (confirm('Tem certeza que deseja limpar o chat?')) {
    fetch(`${appScriptUrl}?func=Delete&spreadsheetId=${spreadsheetId}&id=1`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchMessages();
      })
      .catch(error => console.error('Erro ao limpar o chat:', error));
  }
});

// Atualiza o chat a cada meio segundo
setInterval(fetchMessages, 500);

// Pergunta para salvar o nome ao carregar a página
askToSaveName();