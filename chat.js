const scriptUrl = 'https://script.google.com/macros/s/AKfycbyjcr5t9bACR0Sk2h9MSp4cVY6xKyfd5M4LogbdE39f0aXvT3HV1xaww7sjHKelTwYD/exec'; // Substitua pelo seu URL do Apps Script

document.getElementById('sendButton').addEventListener('click', sendMessage);

function sendMessage() {
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const name = nameInput.value;
    const message = messageInput.value;

    if (name && message) {
        fetch(`${scriptUrl}?name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    messageInput.value = ''; // Limpa o campo de mensagem
                    loadMessages(); // Atualiza as mensagens após enviar
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => console.error('Erro ao enviar mensagem:', error));
    } else {
        alert('Por favor, preencha seu nome e mensagem.');
    }
}

function loadMessages() {
    fetch(`${scriptUrl}?action=getMessages`)
        .then(response => response.json())
        .then(messages => {
            const messagesContainer = document.getElementById('messages');
            messagesContainer.innerHTML = ''; // Limpa mensagens anteriores
            messages.forEach(msg => {
                messagesContainer.innerHTML += `<strong>${msg.name}:</strong> ${msg.message}<br>`;
            });
        });
}

// Carrega as mensagens ao iniciar
loadMessages();

// Atualiza as mensagens a cada 5 segundos
setInterval(loadMessages, 5000);