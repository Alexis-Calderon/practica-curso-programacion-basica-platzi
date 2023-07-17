function iniciarHtml() {
  let botonMascotaJugador = document.getElementById("boton_mascota");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
}

function seleccionarMascotaJugador() {
  let radio1 = document.getElementById("Hipodoge");
  let radio2 = document.getElementById("Capipepo");
  let radio3 = document.getElementById("Ratigueya");
  let spanMascotaJugador = document.getElementById("mascota_jugador");

  if (radio1.checked) {
    spanMascotaJugador.innerHTML = 'Hipodoge'
  } else if (radio2.checked) {
    spanMascotaJugador.innerHTML = 'Capipepo'
  } else if (radio3.checked) {
    spanMascotaJugador.innerHTML = 'Ratigueya'
  } else {
    alert('Selecciona una mascota');
  }
}

window.addEventListener("load", iniciarHtml);