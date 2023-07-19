
const sectionReiniciar = document.getElementById("reiniciar");
const sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque");
const botonMascotaJugador = document.getElementById("boton_mascota");
const botonTierra = document.getElementById("boton_tierra");
const botonFuego = document.getElementById("boton_fuego");
const botonAgua = document.getElementById("boton_agua");
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

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let vidasJugador = 3;
let vidasEnemigo = 3;
let inpuHipodoge 
let inputCapipepo 
let inputRatigueya

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
  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonTierra.addEventListener("click", ataqueTierra);
  botonReiniciar.addEventListener("click", reiniciarJuego);
};

function seleccionarMascotaJugador() {
  sectionSeleccionarAtaque.style.display = 'flex';
  sectionSeleccionarMascota.style.display = 'none';
  if (inpuHipodoge.checked) {
    spanMascotaJugador.innerHTML = inpuHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
  } else {
    alert("Selecciona una mascota");
  }
  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatorio = aleatorio(1, 3);
  if (mascotaAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = "Hipodoge";
  } else if (mascotaAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = "Capipepo";
  } else {
    spanMascotaEnemigo.innerHTML = "Ratigueya";
  }
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueFuego() {
  ataqueJugador = "FUEGO";
  ataqueAleatorioEnemigo();
}

function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueAleatorioEnemigo();
}

function ataqueTierra() {
  ataqueJugador = "TIERRA";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);
  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "TIERRA";
  }
  combate();
}

function combate() {
  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("EMPATE");
  } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    crearMensaje("Ganaste");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    crearMensaje("Ganaste");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    crearMensaje("Ganaste");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("Perdiste");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }
  revisarVidas();
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");
  seccionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;
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
  if (vidasEnemigo == 0) {
    crearMensajeFinal("FELICITACIONES! Ganaste :)");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Lo siento, Perdiste :(");
  }
}

function reiniciarJuego() {
  location.reload();
}

window.addEventListener("load", iniciarHtml);
