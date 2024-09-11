const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');
const chatMessages = document.getElementById('chat-messages');

const spreadsheetId = '1IFeDuSMgjfGjHN2uTw8ZiDolnBt4deZ8kGfAT8PyveQ';
const appScriptUrl = 'https://script.google.com/macros/s/AKfycbzr7zNb0yMi3ooMV2W9VU_Tcn1v-5EH986x5cXy3cekHQPC_t0rl7WM2SU3SfH7YR-F/exec';

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
    })
    .catch(error => console.error('Erro ao obter mensagens:', error));
}

sendButton.addEventListener('click', () => {
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