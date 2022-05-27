const { Usuarios } = require('../classes/usuarios');
const { io } = require('../server');
const { crearMensaje } = require('../utilidades/utilidades')

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {

        if(!usuario.nombre || !usuario.sala){
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            })
        }

        client.join(usuario.sala);

        usuarios.agregarPersonas(client.id, usuario.nombre, usuario.sala);
        client.broadcast.to(usuario.sala).emit('listarPersona', usuarios.obtenerPersonasPorSala(usuario.sala));
        callback(usuarios.obtenerPersonasPorSala(usuario.sala));
    });

    client.on('crearMensaje',(data) => {
        let persona = usuarios.obtenerPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let personaEliminada = usuarios.eliminarPersona(client.id);
        client.broadcast.to(personaEliminada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaEliminada.nombre} abandono el chat`))
        client.broadcast.to(personaEliminada.sala).emit('listarPersona', usuarios.obtenerPersonasPorSala(personaEliminada.sala));
    })

    //Mensajes privados

    client.on('mensajePrivado', (data) => {
        let persona = usuarios.obtenerPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

});