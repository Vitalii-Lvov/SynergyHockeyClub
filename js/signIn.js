function signIn() {
    var statusText = document.getElementById("statusText");
    // statusText.style.display = "none";
    statusText.innerHTML = "Повторите попытку. Логин и пароль не найдены.";
    // statusText.style.display = "inline-block";
    statusText.style.opacity = 1;
    setTimeout(hideStatusText, 3000);
}

function hideStatusText() {
    // statusText.style.display = "none";
    statusText.style.opacity = 0;
}  