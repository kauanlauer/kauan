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


document.addEventListener("DOMContentLoaded", function() {
    var showProjectsBtn = document.getElementById("show-projects-btn");
    var projectsContainer = document.getElementById("projects-container");

    showProjectsBtn.addEventListener("click", function() {
        if (projectsContainer.style.display === "none" || projectsContainer.style.display === "") {
            projectsContainer.style.display = "block";
            showProjectsBtn.textContent = "Ocultar Projetos"; // Altera o texto do botão
        } else {
            projectsContainer.style.display = "none";
            showProjectsBtn.textContent = "Mostrar Projetos"; // Altera o texto do botão
        }
    });
});
