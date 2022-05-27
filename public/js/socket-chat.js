var socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala:   params.get('sala')
}

socket.on('connect', () => {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, (resp) => {
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', () => {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    console.log('Servidor:', mensaje);
});

//Escuchar cambios de usuarios ingreso o salida del chat
socket.on('listarPersona', (personas) => {
    console.log(personas);
});

//Mensajes privador
socket.on('mensajePrivado', (mensaje) => {
    console.log('Mesaje Privado: ', mensaje)
})
