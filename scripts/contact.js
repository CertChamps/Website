const username = document.getElementById('name');
const message = document.getElementById('message');
const email = document.getElementById('email');
const form = document.getElementById('form');
const log = document.getElementById('log');

const submitForm = function (event) {
    console.log("tessir");
    event.preventDefault();

    if (message.value.length < 1) {
        log.innerHTML = 'please enter a message';
    }
    else if (username.value.length < 1) {
        log.innerHTML = 'please enter your name';
    }
    else if (email.value.length < 1) {
        log.innerHTML = 'please enter your email';
    }
    else {
        log.innerHTML = 'Message sent!';
        username.value = '';
        email.value = '';
        message.value = '';
    }
}

form.addEventListener('submit', submitForm);
