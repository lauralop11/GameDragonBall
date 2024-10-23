const url = "https://dragonball-api.com/api/characters?limit=58";

async function getData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const dataDragon = await response.json();
      personagePower (dataDragon.items); 
      transformacion (dataDragon.items);
    } catch (error) {
      console.error(error.message);
    }
  }
//ejercicio#1 : 20 mas poderosos
  function personagePower (personajes) {
    const newPersonajes = personajes.map(personaje => {
        let ki = personaje.maxKi.split(" ");

        switch (true){
            case (ki.indexOf('Billion')!= '-1'):
                stringToNumber (9, ki);
                personaje.maxKi = kiNum;
                break;
            case (ki.indexOf('septillion') != '-1'  ):
                stringToNumber (24, ki);
                personaje.maxKi = kiNum;
                break;
            case ( ki.indexOf('Septillion') != '-1' ):
                    stringToNumber (24, ki);
                    personaje.maxKi = kiNum;
                    break;
            case (ki.indexOf('Trillion')!= '-1') :
                stringToNumber (12, ki);
                personaje.maxKi = kiNum;
                break;
            case (ki.indexOf('Quintillion') != '-1'):
                stringToNumber (18, ki);
                personaje.maxKi = kiNum;
                break;
            case (ki.indexOf('Sextillion') != '-1'):
                stringToNumber (21, ki);
                personaje.maxKi = kiNum;
                break;
           case (ki.indexOf() == '-1'):
                stringToNumber (0, ki);
                personaje.maxKi = kiNum;
                break;
            default:
                break;
        }
        return personaje;     
    })
    seleccionPower (newPersonajes);

}
// transformar texto en numeros
function stringToNumber (numberCero, ki){
    let muchosCeros = '';
        for (let i =0; i <= numberCero ; i++){
            muchosCeros += '0'
            }
            ki.fill(muchosCeros,1);
            ki = ki.join();
            
            ki = ki.replaceAll(',', '');
            ki = ki.replaceAll('.', '');
            kiNum = Number(parseInt(ki));
            return kiNum;
}
// mostrar datos html
function seleccionPower (personajes){
    let container = document.querySelector('.containerPoderosos');
    let i = 0;
        personajes.sort(((a, b) => b.maxKi - a.maxKi)); 
        personajes.forEach(personaje => {
        i++;
        if (i < 21) {

           let list = document.createElement('ls');
           list.classList.add('caja-personajes');
           let img = document.createElement ('img');
            img.classList.add('imagen');
            img.setAttribute('src',`${personaje.image}`);
            list.innerHTML = `${i}. ${personaje.name} Poder: ${personaje.maxKi}`;
            list.appendChild(img);
            container.appendChild(list);
        } else {
            return
        }
    });
}
//ejercicio #2 : sayayin con transformaciones
function transformacion (personajes){
    let container = document.querySelector('.containerSayayines');
    const contentTrans = document.createElement('div');
    contentTrans.classList.add('container');
    const divPersonajes = document.createElement('div');
    divPersonajes.classList.add('content-boton');

    personajes.forEach(personaje => {
        
      if(personaje.race == 'Saiyan'){
        let urlP = `https://dragonball-api.com/api/characters/${personaje.id}`;
        // creacion de botones de los personajes

       const botonPersonaje = document.createElement('button');
       botonPersonaje.setAttribute('type', 'button')
       botonPersonaje.classList.add('boton');
       botonPersonaje.innerHTML = `${personaje.name}`;
       divPersonajes.appendChild(botonPersonaje);
       container.appendChild(divPersonajes);
       // activacion funcion para traer la api
      botonPersonaje.addEventListener('click', function(){
        getDataTrans(urlP,contentTrans)
      });
      container.appendChild(contentTrans);
          
    }  else { 
        return
    }
    });
  }
 async function getDataTrans(url,contentTrans) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const dataDragon = await response.json();
        printTransformacion (dataDragon.transformations, contentTrans,);
        } catch (error) {
            console.error(error.message);
        }
    }

  function printTransformacion(transformaciones,contentTrans){
   contentTrans.innerHTML = "";
    transformaciones.forEach(transformacion => {
        let list = document.createElement('ls');
        list.classList.add('caja-personajes');
        let img = document.createElement ('img');
        img.classList.add('imagen');
        img.setAttribute('src',`${transformacion.image}`)
        list.innerHTML=`${transformacion.name}`;
        list.appendChild(img);
        contentTrans.appendChild(list);
    });
  }

// Ejercicio #3 : Planetas 

async function getDataPlanet() {
    let url = 'https://dragonball-api.com/api/planets';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const dataDragon = await response.json();
        dataPlanetas (dataDragon.items);
        } catch (error) {
            console.error(error.message);
        }
    }
function dataPlanetas (planetas){
    
    let container = document.querySelector('.containerPlanetas');
    const contentTrans = document.createElement('div');
    contentTrans.classList.add('container');
    const divPlanetas = document.createElement('div');
    divPlanetas.classList.add('content-boton', 'content-planet');

    planetas.forEach(planeta => {

        let urlPlanet = `https://dragonball-api.com/api/planets/${planeta.id}`;

        const botonPlaneta = document.createElement('button');
       botonPlaneta.setAttribute('type', 'button')
       botonPlaneta.classList.add('boton','boton-planet');
       botonPlaneta.innerHTML = `${planeta.name}`;
       divPlanetas.appendChild(botonPlaneta);
       container.appendChild(divPlanetas);
        console.log(planeta.name);
       
        let img = document.createElement ('img');
       img.classList.add('imagen');
       img.setAttribute('src',`${planeta.image}`);
       botonPlaneta.appendChild(img);
       // activacion funcion para traer la api
      botonPlaneta.addEventListener('click', function(){
        getDataPersonaje(urlPlanet,contentTrans)
      });
      container.appendChild(contentTrans);
  
    });
  }
  async function getDataPersonaje(url,contentTrans) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const dataDragon = await response.json();
        printTransformacion (dataDragon.characters, contentTrans,);
        } catch (error) {
            console.error(error.message);
        }
    }

  getData(); 
  getDataPlanet ();