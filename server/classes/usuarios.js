class Usuarios{

    constructor(){
        this.personas = [];
    }

    agregarPersonas(id, nombre, sala){
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }

    obtenerPersona(id){
        let persona = this.personas.filter( persona => persona.id === id)[0];
        return persona;
    }

    obtenerPersonas(){
        return this.personas;
    }

    obtenerPersonasPorSala(sala){
        let personaEnSala = this.personas.filter( persona => persona.sala === sala);
        return personaEnSala;
    }

    eliminarPersona(id){
        let personaEliminada = this.obtenerPersona(id)
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaEliminada;
    }

}

module.exports = {
    Usuarios
}