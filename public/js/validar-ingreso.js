//Referencias
let nombre = document.querySelector('#nombre');
let sala = document.querySelector('#sala');
let loginform = document.querySelector('#loginform');
let btn = document.querySelector('button');

loginform.addEventListener("submit",(e)=>{
    e.preventDefault();
    if (sala.value.length > 0 & nombre.value.length > 0) {
        if (nombre.value.trim() != 'Administrador') {
            loginform.submit();
        }else {
            alert('No puedes usar el nombre Administrador')
        }
    }
})
