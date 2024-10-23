class Personaje {
    constructor (nombre, ki, imagen){
        this.nombre = nombre;
        this.ki = ki;
        this.imagen = imagen;
    }

    mostrarPersonaje(){
         const contentPersonaje = document.querySelector ('#containerPersonajes');
    
        let list = document.createElement('ls');
        list.classList.add('caja-personajes');
        let img = document.createElement ('img');
        img.classList.add('imagen');
        img.setAttribute('src',`${this.imagen}`);
        list.innerHTML=`${this.nombre} ${this.ki}`;
        list.addEventListener('click',function(){
            combate(this.nombre, this.ki, this.imagen);
        })
        list.appendChild(img);
        contentPersonaje.appendChild(list);
        
    
    }
}
function juegoPersonajes (personajes){
  personajes.forEach (personaje =>{
    const personajeNew = new Personaje (`${personaje.name}`, `${personaje.ki}`, `${personaje.image}`);
    personajeNew.mostrarPersonaje();
    console.log(personajeNew);
  });
}