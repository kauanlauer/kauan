document.getElementById("login-btn").addEventListener("click", function() {
    var loginForm = document.getElementById("login-form");
    if (loginForm.style.display === "none" || loginForm.style.display === "") {
        loginForm.style.display = "block";
    } else {
        loginForm.style.display = "none";
    }
});


function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "kauanlauer" && password === "3396") {
        window.location.href = "areadaformatação.html";
        return false;
    } else {
        alert("Usuário ou senha incorretos.");
        return false;
    }
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Captura os valores dos campos do formulário
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var location = document.getElementById("location").value;
    var service = document.getElementById("service").value;
    var message = document.getElementById("message").value;

    // Monta a mensagem a ser enviada para o WhatsApp
    var whatsappMessage = "Nome: " + name + "%0A";
    whatsappMessage += "E-mail: " + email + "%0A";
    whatsappMessage += "Cidade/Bairro: " + location + "%0A";
    whatsappMessage += "Serviço: " + service + "%0A";
    whatsappMessage += "Observações: " + message;

    // Redireciona para o link do WhatsApp com a mensagem
    window.location.href = "https://api.whatsapp.com/send?phone=5541999426605&text=" + whatsappMessage;
});
