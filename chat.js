const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

const spreadsheetId = '1IFeDuSMgjfGjHN2uTw8ZiDolnBt4deZ8kGfAT8PyveQ';
const appScriptUrl = 'https://script.google.com/macros/s/AKfycbzr7zNb0yMi3ooMV2W9VU_Tcn1v-5EH986x5cXy3cekHQPC_t0rl7WM2SU3SfH7YR-F/exec';

let newMessageCount = 0; // Contador de mensagens novas
let lastReadMessageId = 0; // ID da última mensagem lida

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
            const previousMessageCount = newMessageCount; // Armazena o número anterior de mensagens

            data.forEach(row => {
                const messageElement = document.createElement('div');
                messageElement.className = 'message'; // Adiciona a classe para estilização
                
                // Constrói a mensagem com o nome e todos os comentários
                const id = row[0]; // ID da mensagem
                const nome = row[1]; // Nome
                const comentarios = row.slice(2).filter(comment => comment).join(", "); // Comentários da coluna C até AZ
                messageElement.innerHTML = `<span class="name">${nome}:</span> ${comentarios}`; // Nome e todos os comentários
                chatMessages.appendChild(messageElement);

                // Atualiza o ID da última mensagem lida se a mensagem atual for mais recente
                if (id > lastReadMessageId) {
                    lastReadMessageId = id;
                }
            });

            // Atualiza o contador de mensagens novas
            newMessageCount = data.filter(row => row[0] > lastReadMessageId).length; // Conta apenas as mensagens com ID maior que a última lida
            if (newMessageCount > 0) {
                updateTitle(); // Atualiza o título da página se houver novas mensagens
            } else {
                resetNotifications(); // Reseta as notificações se não houver novas mensagens
            }

            chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para o final do chat
        })
        .catch(error => console.error('Erro ao obter mensagens:', error));
}

function updateTitle() {
    document.title = `(${newMessageCount}) Mensagens Novas`; // Atualiza o título da página
}

function resetNotifications() {
    newMessageCount = 0; // Reinicia o contador
    document.title = "Chat"; // Reseta o título se não houver mensagens novas
}

async function sendMessage() {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name && message) {
        // Exibe um indicador de carregamento
        sendButton.disabled = true; // Desabilita o botão para evitar cliques múltiplos
        sendButton.innerText = 'Enviando...'; // Altera o texto do botão

        // Envia o nome e a mensagem usando "," como delimitador
        try {
            const response = await fetch(`${appScriptUrl}?func=Create&spreadsheetId=${spreadsheetId}&values=${name},${message}`);
            const data = await response.json();

            if (data === "Linha adicionada com sucesso") {
                console.log(data);
                messageInput.value = '';
                fetchMessages(); // Atualiza as mensagens após enviar
            } else {
                alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        } finally {
            // Restaura o botão
            sendButton.disabled = false; // Reabilita o botão
            sendButton.innerText = 'Enviar'; // Restaura o texto original
        }
    } else {
        alert('Por favor, preencha seu nome e a mensagem.');
    }
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('click', () => {
    resetNotifications(); // Reseta as notificações ao clicar no campo de mensagem
});

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Atualiza o chat a cada meio segundo
setInterval(fetchMessages, 500);

// Pergunta para salvar o nome ao carregar a página
askToSaveName();
resetNotifications(); // Reseta as notificações ao entrar na página
