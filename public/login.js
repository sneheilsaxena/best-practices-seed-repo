// add sign up info to server
function submitLogin() {

    // login
    var data = `username=${DOMPurify.sanitize(userName.value)}&password=${DOMPurify.sanitize(password.value)}`;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4 && this.status === 200) {
            saveToLocalStorage(JSON.parse(this.responseText));

            window.location.href = "index.html";
        }
        if (this.readyState === 4 && this.status !== 200) {
            alert("Sorry, login failed. Please check your username and password, and try again.");
        }
    });

    xhr.open("POST", "https://fa19server.appspot.com/api/Users/login");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
}

function saveToLocalStorage(responseText) {
    var userInfo = {
        accessToken: responseText.id,
        accountId: responseText.userId,
        expireTime: (responseText.ttl * 1000) + (new Date).getTime(),
        userName: DOMPurify.sanitize(userName.value)
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
}


// check sign up form values
function checkForm() {

    if (userName.value == "") {
        alert("Please enter a username");
        return false;
    }

    if (password.value == "") {
        alert("Please enter a valid password");
        return false;
    }

    return true;
}