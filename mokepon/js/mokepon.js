
const sectionReiniciar = document.getElementById("reiniciar");
const sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque");
const botonMascotaJugador = document.getElementById("boton_mascota");
const botonReiniciar = document.getElementById("boton_reiniciar");
const sectionSeleccionarMascota = document.getElementById("seleccionar_mascota");
const spanMascotaJugador = document.getElementById("mascota_jugador");
const spanMascotaEnemigo = document.getElementById("mascota_enemigo");
const spanVidasJugador = document.getElementById("vidas_jugador");
const spanVidasEnemigo = document.getElementById("vidas_enemigo");
const seccionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques_del_jugador");
const ataquesDelEnemigo = document.getElementById("ataques_del_enemigo");
const contenedorTarjetas = document.getElementById('contenedor_tarjetas');
const contenedorAtaques = document.getElementById('contenedor_ataques');

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let mascotaJugador;
let ataquesMokepon
let vidasJugador = 3;
let vidasEnemigo = 3;
let inpuHipodoge 
let inputCapipepo 
let inputRatigueya
let botonTierra
let botonFuego
let botonAgua
let botones = []
let ataquesMokeponEnemigo  = []
let indexAtaqueJugador 
let indexAtaqueEnemigo 
let victoriasJugador = 0
let victoriasEnemigo = 0

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  5
);
let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  5
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  5
);

hipodoge.ataques.push(
  { nombre: "💧", id: "boton_agua" },
  { nombre: "💧", id: "boton_agua" },
  { nombre: "💧", id: "boton_agua" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🌱", id: "boton_tierra" },
);

capipepo.ataques.push(
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "💧", id: "boton_agua" },
  { nombre: "🔥", id: "boton_fuego" },
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "💧", id: "boton_agua" },
);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarHtml() {
  sectionSeleccionarAtaque.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta_de_mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}/>
    </label>`
    contenedorTarjetas.innerHTML += opcionDeMokepones;
    inpuHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
  })

  sectionReiniciar.style.display = "none";
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);
};

function seleccionarMascotaJugador() {
  sectionSeleccionarAtaque.style.display = "flex";
  sectionSeleccionarMascota.style.display = "none";
  if (inpuHipodoge.checked) {
    spanMascotaJugador.innerHTML = inpuHipodoge.id;
    mascotaJugador = inpuHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Selecciona una mascota");
  }
  extraerAtaques(mascotaJugador);
  seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
  let ataques
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
    <button id=${ataque.id} class="boton_de_ataque BAtaque">${ataque.nombre}</button>
    `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botonTierra = document.getElementById("boton_tierra");
  botonFuego = document.getElementById("boton_fuego");
  botonAgua = document.getElementById("boton_agua");
  botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque(){
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if(e.target.textContent === '🔥'){
        ataqueJugador.push('FUEGO');
        boton.style.background = '#112f58'
      } else if (e.target.textContent === '💧'){
        ataqueJugador.push('AGUA');
        boton.style.background = '#112f58'
      } else {
        ataqueJugador.push('TIERRA');
        boton.style.background = '#112f58'
      }
      ataqueAleatorioEnemigo()
    })
  })
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatorio = aleatorio(0, mokepones.length -1);
  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre;
  ataquesMokeponEnemigo =  mokepones[mascotaAleatorio].ataques;
  secuenciaAtaque()

}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }
  iniciarPelea()
}

function iniciarPelea(){
  if (ataqueJugador.length === 5){
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];

}

function combate() {
  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueJugador[i] === ataqueEnemigo[i]) {
      indexAmbosOponentes(i, i);
      crearMensaje("EMPATE");
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA") {
      indexAmbosOponentes(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO") {
      indexAmbosOponentes(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA") {
      indexAmbosOponentes(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(i, i);
      crearMensaje("Perdiste");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }
  revisarVidas();
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");
  seccionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  seccionMensajes.innerHTML = resultadoFinal;
  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true;
  sectionReiniciar.style.display = 'block';
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Esto fue un empate");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICITACIONES, Ganaste :)");
  }else {
  crearMensajeFinal("Lo siento, Perdiste :(");
  }
}

function reiniciarJuego() {
  location.reload();
}

window.addEventListener("load", iniciarHtml);
