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

window.addEventListener('scroll', function() {
    var header = document.getElementById('main-header');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        header.style.background = 'linear-gradient(to right, #3f5efb, #8f021e)';
    } else {
        header.style.background = 'transparent';
    }
});


// Adicione um evento de carregamento da página para iniciar a animação
window.addEventListener('load', function() {
    const texto = document.getElementById('texto-sobre');
    const textoCompleto = texto.innerHTML;
    texto.innerHTML = '';

    // Separe as palavras do texto
    const palavras = textoCompleto.split(' ');

    // Adicione cada palavra com um pequeno atraso para criar o efeito de escrita
    palavras.forEach(function(palavra, index) {
        setTimeout(function() {
            texto.innerHTML += palavra + ' ';
        }, index * 100); // Ajuste o atraso conforme necessário
    });
});

