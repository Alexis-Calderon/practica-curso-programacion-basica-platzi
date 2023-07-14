function iniciarHtml(){
    let botonMascotaJugador = document.getElementById('boton_mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador(){
    let radio1 = document.getElementById('Hipodoge');
    let radio2 = document.getElementById('Capipepo');
    let radio3 = document.getElementById('Ratigueya');
    if(radio1.checked){
        
    }else if(radio2.checked){

    }else if(radio3.checked){

    }
}

window.addEventListener('load', iniciarHtml)