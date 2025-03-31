let eye = document.querySelector(".eye")
let inputPass = document.querySelector(".pass")

eye.addEventListener("click", function() {
    if(inputPass.type === "password") {
        inputPass.type = "text"
        eye.src = "./img/photo_2025-02-23 open.jpg";
    }
    else{
        inputPass.type = "password";
        eye.src = "./img/photo_2025-02-23 close.jpg";
    }
});

let info = {}
let emailInput = document.querySelector("#email")
let passInput = document.querySelector(".pass")

emailInput.addEventListener("input", function() {
    info.email = this.value
});

passInput.addEventListener("input", function(){
    info.password = this.value
});


const emailLog = document.querySelector("#email")
const passLog = document.querySelector(".pass")
const button = document.querySelector(".back-signup")

button?.addEventListener("click", function(e){
    e.preventDefault();
    fetch('http://localhost:3000/sign-up', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
}).then(response => {
    return response.json()
}).then(data => {
    console.log(data)
})
});


const button1 = document.querySelector(".back-signin")

button1?.addEventListener("click", function(e){
    e.preventDefault();
    fetch('http://localhost:3000/sign-in', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
}).then(response => {
    return response.json()
}).then(data => {
    localStorage.setItem('token', data.token)
})
});
