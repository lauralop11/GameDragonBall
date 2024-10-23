
const url = "https://dragonball-api.com/api/characters?limit=58";
let contadorUsuario = 0;
let contadorComputadora = 0;

async function getData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const dataDragon = await response.json();
      juegoPersonajes (dataDragon.items);
    } catch (error) {
      console.error(error.message);
    }
  }

function juegoPersonajes (personajes){
    const contentPersonaje = document.querySelector ('#containerPersonajes');
    personajes.forEach(personaje => {
        let list = document.createElement('ls');
        list.classList.add('caja-personajes');
        list.setAttribute('id', `${personaje.id}`)
        let divImag = document.createElement('div');
        divImag.classList.add('contenedor-imagen-juego');
        let img = document.createElement ('img');
        img.classList.add('imagen-juego');
        img.setAttribute('src',`${personaje.image}`)
        list.innerHTML=`${personaje.name}`;
        list.addEventListener ('click', function(){
            combate(personaje,personajes);
        });
        divImag.appendChild(img);
        list.appendChild(divImag);
        contentPersonaje.appendChild(list);
    });
}

function combate (personajeSelect,personajes){
    let personajeComp = Math.ceil(Math.random()*58);
    
    if (personajeSelect.id == personajes[personajeComp].id){
        personajeComp
    } else {
      
      let usuario = document.getElementById(`${personajeSelect.id}`);
      let computador = document.getElementById(`${personajes[personajeComp].id}`);

      let usado1 = usuario.classList.contains('caja-personajes-usados');
      let usado2 =  computador.classList.contains('caja-personajes-usados');

      if (usado1 == true || usado2 == true){
        personajeComp
      } else {
        sweetAlert(personajeSelect,personajes[personajeComp]);
        validacionPuntaje (personajeSelect, personajes[personajeComp]);
        usuario.classList.add('caja-personajes-usados');
        computador.classList.add('caja-personajes-usados');
      }
      
      
    }
}


function sweetAlert (personajeSelect, personajeComp){
    Swal.fire({
        html: `
        <section class= 'sect-modal'>
        <h2> Combate </h2>
        <div class='modal'>
            <div class='contenido-modal' id='${personajeSelect.id}Modal'>
                <div class='contenedor-imagen-juego'>
                    <img class='imagen-juego' src='${personajeSelect.image}'/>
                </div>
                <p>${personajeSelect.name}</p>
                <p>${personajeSelect.ki}</p>
            </div>
            <div class='contenido-modal' id='${personajeComp.id}Modal'>
                <div class='contenedor-imagen-juego'>
                    <img class='imagen-juego' src='${personajeComp.image}'/>
                </div>
                <p>${personajeComp.name}</p>
                <p>${personajeComp.ki}</p>
            </div>
        </div> 
        </section>`
      });
}
function validacionPuntaje (personajeSelect, personajeComp){
  const contadorPartidas = document.querySelector ('#contadorPartidas');

  let personajeUsuario = personajeSelect.ki;
  let personajeAutomatico = personajeComp.ki;
  console.log (personajeAutomatico)
  if (personajeUsuario == 'unknown'&& personajeAutomatico == 'unknown' ){
    personajeUsuario = 0;
    personajeAutomatico = 0;
  } else if (personajeUsuario == 'unknown' ){
    personajeUsuario = 0;
  } else if (personajeAutomatico == 'unknown'){
    personajeAutomatico = 0;
  } else {
     personajeUsuario = Math.trunc(personajeUsuario.replace('.', ''));
    personajeAutomatico = Math.trunc(personajeAutomatico.replace('.', ''));
  }

    if (personajeUsuario > personajeAutomatico){
      contadorUsuario += 1;
      setTimeout (()=> {
        mostrarCombate (personajeSelect, personajeComp, 'left', 'right');
      },1000);
      } else {
        contadorComputadora += 1;
        setTimeout (()=> {
          mostrarCombate (personajeComp, personajeSelect,'right', 'left');
        },1000);
      }
  contadorPartidas. innerHTML = `Partidas usuario: ${contadorUsuario}  Partidas computadora: ${contadorComputadora}`
  }

   
  

function mostrarCombate (personajeWinner,personajeLoser,posicionWinner, posicionLoser){
  let imgWinner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
  let imgLoser = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
  const contentModal = document.getElementById(`${personajeWinner.id}Modal`);
  const contentModalLoser = document.getElementById(`${personajeLoser.id}Modal`);

  const resultado = document.createElement('p');
  const resultadoIconWinner= document.createElement('span');
  const resultadoIconLoser= document.createElement('span');

  resultadoIconWinner.classList.add('icono',`icono-winner-${posicionWinner}`);
  resultadoIconLoser.classList.add('icono',`icono-loser-${posicionLoser}`); 

  resultado.innerHTML = `${personajeWinner.name} ha ganado la partida!`;

  resultadoIconWinner.innerHTML = imgWinner;
  resultadoIconLoser.innerHTML = imgLoser; 
  
  contentModal.appendChild(resultadoIconWinner);
  contentModalLoser.appendChild(resultadoIconLoser);
  contentModal.append(resultado);
}
getData();