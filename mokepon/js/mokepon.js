function iniciarHtml() {
  let botonMascotaJugador = document.getElementById("boton_mascota");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
}

function seleccionarMascotaJugador() {
  let radio1 = document.getElementById("Hipodoge");
  let radio2 = document.getElementById("Capipepo");
  let radio3 = document.getElementById("Ratigueya");
  if (radio1.checked) {
    alert('Selecionaste a Hipodoge');
  } else if (radio2.checked) {
    alert('Selecionaste a Capipepo');
  } else if (radio3.checked) {
    alert('Selecionaste a Ratigueya');
  } else {
    alert('Selecciona una mascota');
  }
}

window.addEventListener("load", iniciarHtml);
