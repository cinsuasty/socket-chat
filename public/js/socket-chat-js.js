//Parametros URL
let params_html = new URLSearchParams(window.location.search);

//Referencia HTML
let divUsuarios = document.querySelector('#divUsuarios');
let inputMensaje = document.querySelector('#inputMensaje');
let formEnviar = document.querySelector('#formEnviar');
let divChatbox = document.querySelector('#divChatbox');
document.querySelector('.box-title').innerHTML = `Sala ${params_html.get('sala')}`

// Renderizado usuarios conectados
const renderizarUsuario = (personas) => {
    console.log(personas);

    let html = '';

    for (let i = 0; i < personas.length; i++) {
        html += `
                <li>
                    <a href="javascript:void(0)" onclick="chatClick('${personas[i].id}')"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${personas[i].nombre} <small class="text-success">online</small></span></a>
                </li>
            `;
    }
    divUsuarios.innerHTML = html;
}

//Renderizar mensaje enviado y recibidos
const renderizarMensajes = (mensaje, me) => {
    let html = '';
    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();
    let adminClass = 'info';

    if (mensaje.nombre === 'Administrador'){
        adminClass = 'danger'
    }

    if (me) {
        html = `
            <li class="reverse">
                <div class="chat-content">
                    <h5>${mensaje.nombre}</h5>
                    <div class="box bg-light-inverse">${mensaje.mensaje}</div>
                </div>
                <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
                <div class="chat-time">${hora}</div>
            </li>
        `;
    }else{
        let img = '<img src="assets/images/users/1.jpg" alt="user"/>';
        if (mensaje.nombre === 'Administrador'){
            img = '';
        }
        html = `
            <li class="animated fadeIn">
                <div class="chat-img">${img}</div>
                <div class="chat-content">
                    <h5>${mensaje.nombre}</h5>
                    <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
                </div>
                <div class="chat-time">#${hora}</div>
            </li>
        `;
    }
    divChatbox.insertAdjacentHTML('beforeend',html);
}

//Auto scroll mensajes
const scrollBottom = () => {
    divChatbox.scrollTop = divChatbox.scrollHeight - divChatbox.clientHeight;
}
// Escuchar click en usuario conectado
chatClick = (id) => {
    console.log(id);
}

// Enviar mensaje

formEnviar.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputMensaje.value.trim().length > 0) {
        //Enviar información
        socket.emit('crearMensaje', {
            nombre: params_html.get('nombre'),
            mensaje: inputMensaje.value.trim()
        }, (mensaje) => {
            inputMensaje.value = '';
            renderizarMensajes(mensaje,true);
            inputMensaje.focus();
            scrollBottom();
        });
    }
})
