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

