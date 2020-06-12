// add sign up info to server
function submitSignup() {

    // sign up
    var data = encodeURI(`username=${DOMPurify.sanitize(userName.value)}&email=${DOMPurify.sanitize(email.value)}&password=${DOMPurify.sanitize(password.value)}`);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4 && this.status === 200) {

            alert("Sign up successful. Redirecting to login page.");
            window.location.href = "login.html";
        }
    });

    xhr.open("POST", "https://fa19server.appspot.com/api/Users");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
}


// check sign up form values
function checkForm() {

    if (userName.value == "") {
        alert("Please enter a username");
        return false;
    }

    if (!email.value.includes("@") || !email.value.split("@")[1].includes(".")) {
        alert("Please enter a valid email");
        return false;
    }

    if (password.value == "") {
        alert("Please enter a password");
        return false;
    }

    if (password2.value !== password.value) {
        alert("Password you entered did not match. Please try again");
        return false;
    }

    return true;
}