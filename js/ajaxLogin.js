import { serverCall, rutaPhp, mensaje } from "./module/functions.js";

// Evento que recoge los datos de la sesion de php al finalizar la carga de index.html
document.addEventListener("DOMContentLoaded", function() {
	let ruta = rutaPhp + "verSesion.php";
	serverCall(ruta, recibirDatosLogin);
});

// Evento click que recoge el usuario y la contraseña de quien hace login y realiza la comprobacion
document.getElementById("entrarLogin").addEventListener("click", function() {
	if (document.getElementById("usuario").value == "" || document.getElementById("pwd").value == "") {
		mensaje("Rellena los datos de inicio de sesión");
		document.getElementById("usuario").focus();
	} else {
		let datos = {
			usuario: document.getElementById("usuario").value,
			password: document.getElementById("pwd").value
		};
		let jsonstring = JSON.stringify(datos);
		let ruta = rutaPhp + "login.php?datos=" + jsonstring;
		serverCall(ruta, recibirResultadoLogin);
	}
});

// Evento click que cierra la sesion de php
document.getElementById("salir").addEventListener("click", function() {
	let ruta = rutaPhp + "cerrarSesion.php";
	serverCall(ruta);

	document.getElementById("contenido").style.display = "none";
	document.getElementById("usuario").value = "";
	document.getElementById("pwd").value = "";
	document.getElementById("formLogin").style.display = "flex";
	document.getElementById("inicialLog").innerHTML = "";
	document.getElementById("userLog").style.display = "none";
	document.getElementById("listOptions").style.display = "none";
});

// Funcion que comprueba que si hay algun usuario logeado al recagar la pagina
function recibirDatosLogin( response ) {
	let mostrar = "";

	if(response == "Sin datos") {
		document.getElementById("formLogin").style.display = "flex";
	} else {
		let profesor = JSON.parse(response);
		document.getElementById("contenido").style.display = "block";
		document.getElementById("inicialLog").innerHTML = profesor[1][0];
		document.getElementById("userLog").style.display = "flex";
		if(profesor[2] === "Profesor") { mostrar = "none"; }
		else { mostrar = "block"; }
		document.getElementById("listadosEnlace").style.display = mostrar;
	}
}

// Funcion que comprueba si el login es correcto
function recibirResultadoLogin( response ){
	let mostrar = "";
	
	if(response === "Sin resultado") {
		mensaje("Datos de inicio de sesión erroneos");
		document.getElementById("usuario").focus();
	} else {
		let profesor = JSON.parse(response);
		document.getElementById("formLogin").style.display = "none";
		document.getElementById("contenido").style.display = "block";
		document.getElementById("inicialLog").innerHTML = profesor[0]["Nombre"][0];
		document.getElementById("userLog").style.display = "flex";
		if(profesor[0]["Permisos"] === "Profesor") { mostrar = "none"; }
		else { mostrar = "block"; }
		document.getElementById("listadosEnlace").style.display = mostrar;
	}
}