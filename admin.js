// admin.js

function verificarSenha() {
    var senha = prompt("Digite a senha para acessar a área do administrador:");

    if (senha === "3396") {
        window.location.href = "areadaformatacao.html";
    } else {
        alert("Senha incorreta. Tente novamente.");
    }
}
