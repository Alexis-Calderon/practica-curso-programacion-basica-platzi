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
const contenedorTarjetas = document.getElementById("contenedor_tarjetas");
const contenedorAtaques = document.getElementById("contenedor_ataques");
const sectionVerMapa = document.getElementById("ver_mapa");
const mapa = document.getElementById("mapa");

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let mascotaJugador;
let ataquesMokepon;
let vidasJugador = 3;
let vidasEnemigo = 3;
let inpuHipodoge;
let inputCapipepo;
let inputRatigueya;
let botonTierra;
let botonFuego;
let botonAgua;
let botones = [];
let ataquesMokeponEnemigo = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext("2d");
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let mascotaJugadoObjeto
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  './assets/hipodoge.png'
);
let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  5,
  './assets/capipepo.png'
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  './assets/ratigueya.png'
);

let hipodogeEnemigo = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  "./assets/hipodoge.png"
);
let capipepoEnemigo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  5,
  "./assets/capipepo.png"
);
let ratigueyaEnemigo = new Mokepon( 
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  './assets/ratigueya.png'
);

hipodoge.ataques.push(
  { nombre: "💧", id: "boton_agua" },
  { nombre: "💧", id: "boton_agua" },
  { nombre: "💧", id: "boton_agua" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🌱", id: "boton_tierra" }
);
hipodogeEnemigo.ataques.push(
  { nombre: "💧", id: "boton_agua" },
  { nombre: "💧", id: "boton_agua" },
  { nombre: "💧", id: "boton_agua" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🌱", id: "boton_tierra" }
);

capipepo.ataques.push(
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "💧", id: "boton_agua" },
  { nombre: "🔥", id: "boton_fuego" }
);
capipepoEnemigo.ataques.push(
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "💧", id: "boton_agua" },
  { nombre: "🔥", id: "boton_fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "💧", id: "boton_agua" }
);
ratigueyaEnemigo.ataques.push(
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🔥", id: "boton_fuego" },
  { nombre: "🌱", id: "boton_tierra" },
  { nombre: "💧", id: "boton_agua" }
);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarHtml() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta_de_mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}/>
    </label>`;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
    inpuHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
  });

  sectionReiniciar.style.display = "none";
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);

  unirseAlJuego()
}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse")
  .then(function (res) {
    if (res.ok) {
      res.text()
        .then(function(respuesta){
          console.log(respuesta)
        })
    }
  })
}

function seleccionarMascotaJugador() {
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
  sectionVerMapa.style.display = "flex";
  iniciarMapa()
  extraerAtaques(mascotaJugador);
}

function extraerAtaques(mascotaJugador) {
  let ataques;
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
  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("AGUA");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("TIERRA");
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
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
    } else if (ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA") {
      indexAmbosOponentes(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO") {
      indexAmbosOponentes(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA") {
      indexAmbosOponentes(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++;
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
  sectionReiniciar.style.display = "block";
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Esto fue un empate");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICITACIONES, Ganaste :)");
  } else {
    crearMensajeFinal("Lo siento, Perdiste :(");
  }
}

function reiniciarJuego() {
  location.reload();
}

function pintarCanvas() {
  mascotaJugadoObjeto.x = mascotaJugadoObjeto.x + mascotaJugadoObjeto.velocidadX
  mascotaJugadoObjeto.y = mascotaJugadoObjeto.y + mascotaJugadoObjeto.velocidadY
  lienzo.clearRect(0,0, mapa.clientWidth, mapa.height)
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  )
  mascotaJugadoObjeto.pintarMokepon()
  hipodogeEnemigo.pintarMokepon()
  capipepoEnemigo.pintarMokepon()
  ratigueyaEnemigo.pintarMokepon()
  if (mascotaJugadoObjeto.velocidadX !== 0 || mascotaJugadoObjeto.velocidadY !== 0) {
    revisarColicion(hipodogeEnemigo)
    revisarColicion(capipepoEnemigo)
    revisarColicion(ratigueyaEnemigo)
  }
}

function moverArriba() {
  mascotaJugadoObjeto.velocidadY = -5
  // mascotaJugadoObjeto.y = mascotaJugadoObjeto.y - 5;
  // pintarCanvas()
}

function moverIzquierda() {
  mascotaJugadoObjeto.velocidadX = -5
}

function moverAbajo() {
  mascotaJugadoObjeto.velocidadY = +5
}

function moverDerecha() {
  mascotaJugadoObjeto.velocidadX = +5
}

function detenerMovimiento() {
  mascotaJugadoObjeto.velocidadX = 0
  mascotaJugadoObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadoObjeto = obtenerObjetoMascota(mascotaJugador)
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColicion (enemigo) {
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const izquierdaEnemigo = enemigo.x
  const derechaEnemigo = enemigo.x + enemigo.ancho

  const arribaMascota = mascotaJugadoObjeto.y
  const abajoMascota = mascotaJugadoObjeto.y + mascotaJugadoObjeto.alto
  const izquierdaMascota = mascotaJugadoObjeto.x
  const derechaMascota = mascotaJugadoObjeto.x + mascotaJugadoObjeto.ancho

  if(abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
    return;
  }
  detenerMovimiento()
  clearInterval(intervalo)
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = 'none'
  seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener("load", iniciarHtml);
