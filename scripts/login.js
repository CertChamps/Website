// get items 
const emailErr = document.getElementById('email-error');
const passwordErr = document.getElementById('password-error');
const email = document.getElementById('email');
const password = document.getElementById('password');

const updatePassword = function (event) {

    console.log(this.value.length); 

    if ( this.value.length < 8) {
        passwordErr.innerHTML = 'password must be 8 characters';
    } 
    else {
        passwordErr.innerHTML = ''; 
    }

}

const updateEmail = function (event) {

    if ( this.value.includes('@') && this.value.includes('.') ){
        emailErr.innerHTML = ''; 
    }
    else {
        emailErr.innerHTML = 'invalid email'; 
    }
}


// event listeners for input change 
email.addEventListener('input', updateEmail);
password.addEventListener('input', updatePassword);