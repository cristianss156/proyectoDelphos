import { serverCall, rutaPhp, mensaje } from "./module/functions.js";

var usuario;
var _cod;
var _tipo;
var v_dni;

// Evento que recoge los datos de la sesion de php al finalizar la carga de index.html
document.addEventListener("DOMContentLoaded", function() {
	let ruta = rutaPhp + "verSesion.php";
	serverCall(ruta, recibirDatosLogin);
});

// Funcion que recoge el codigo de la expulsion o amonestacion sobre la que se va a trabajar
var inputsCod = document.getElementsByClassName("accionBoton");
 for (let i = 0; i < inputsCod.length; i++) {
 	inputsCod[i].addEventListener("click", function( e ) {
 		if(e.target) {
	 		cod = this.value;
	 	}
	 })
 };
//var recogerCod = ( _codigo ) => _cod = _codigo;

// Funcion que recoge si hay que firmar una amonestacion o una expulsion
var inputs = document.getElementsByClassName("filtro");
 for (let i = 0; i < inputs.length; i++) {
 	inputs[i].addEventListener("click", function() {
	 	_tipo = this.value;
	 })
 };
//var recogerTipo = ( _tipoFirma ) =>	_tipo = _tipoFirma;

// Funcion que recoge el dni del alumno para utilizarlo en las distintas funciones
var inputsDNI = document.getElementsByClassName("accionDNI");
 for (let i = 0; i < inputsDNI.length; i++) {
 	inputsDNI[i].addEventListener("click", function( e ) {
 		if(e.target) {
	 		v_dni = this.value;
	 	}
	 })
 };
//var recogerDNI = ( _dni ) => v_dni = _dni;

// Funcion que recibe los datos que se necesitan para grabar una amonestacion
document.getElementById("amonestar").addEventListener("click", function() {
	var datosAmonestacion = {
		curso: document.getElementById("Curso").value,
		profesor: usuario,
		alumno: document.getElementById("alumno").value,
		fecha: document.getElementById("fecha_amo").value,
		hora: document.getElementById("hora_amo").value,
		asignatura: document.getElementById("asignatura").value,
		causa:document.getElementById("causa_amo").value
	};

	var jsonstring = JSON.stringify(datosAmonestacion);
	let ruta = rutaPhp + "amonestar.php?datosAmonestacion=" + jsonstring;
	serverCall(ruta, recibirResultadoAmonestacion);
});

// Funcion que recibe los datos que se necesitan para grabar una expulsion
document.getElementById("expulsar").addEventListener("click", function() {
	var datosExpulsion = {
		curso: document.getElementById("Curso_Exp").value,
		profesor: usuario,
		alumno: document.getElementById("alumno_Exp").value,
		fecha: document.getElementById("fecha_exp").value,
		hora: document.getElementById("hora_exp").value,
		asignatura: document.getElementById("asignatura_exp").value,
		causa: document.getElementById("causa_exp").value,
		tipo: "normal"
	};

	var jsonstring = JSON.stringify(datosExpulsion);
	let ruta = rutaPhp + "expulsar.php?datosExpulsion=" + jsonstring;
	serverCall(ruta, recibirResultadoExpulsion);
});

// Funcion que recibe los datos que se necesitan para grabar una expulsion directa con sancion
document.getElementById("expulsarSancion").addEventListener("click", function() {
	var datosExpulsion = {
		curso: document.getElementById("Curso_Exp").value,
		profesor: usuario,
		alumno: document.getElementById("alumno_Exp").value,
		fecha: document.getElementById("fecha_exp").value,
		hora: document.getElementById("hora_exp").value,
		asignatura: document.getElementById("asignatura_exp").value,
		causa: document.getElementById("causa_exp").value,
		tipo: "SancionDirecta"
	};

	var jsonstring = JSON.stringify(datosExpulsion);
	let ruta = rutaPhp + "expulsar.php?datosExpulsion=" + jsonstring;
	serverCall(ruta, recibirResultadoExpulsion);
});

// Funcion que recibe los datos que se necesitan para grabar la firma de una expulsion o una amonestacion
document.getElementById("firmar").addEventListener("click", function() {
	var datosFirma = {
		codigo: _cod,
		fecha: document.getElementById("fech_firma").value,
		tipo: _tipo
	};

	var jsonstring = JSON.stringify(datosFirma);
	let ruta = rutaPhp + "firmar.php?datosFirma=" + jsonstring;
	serverCall(ruta, recibirResultadoFirma);
});

// Funcion que recibe los datos que se necesitan para grabar una sancion
document.getElementById("sancionar").addEventListener("click", function() {
	var datosSancion = {
		codigo: _cod,
		profesor: usuario,
		fecha: document.getElementById("fech_Sancion").value,
		alumno: v_dni,
		sancion: document.getElementById("nueva_Sancion").value
	};

	var jsonstring = JSON.stringify(datosSancion);
	let ruta = rutaPhp + "sancionar.php?datosSancion=" + jsonstring;
	serverCall(ruta, recibirResultadoSancion);
});

/* Funcion llamada por "compruebaSesion()" que recoge los datos del servidor y guarda en la variable global "usuario"
	el codigo del usuario para poder usarlo en el resto de funciones */
function recibirDatosLogin( response ) {
	let profesor = JSON.parse(response);
	usuario = profesor[0];
}

// Funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras amonestar
function recibirResultadoAmonestacion( response ) {
	if(response === 0) {
		mensaje("Error al registrar la amonestación");
	}	else {
		mensaje("Amonestación guardada");
	}
}

// Funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras expulsar
function recibirResultadoExpulsion( response ) {
	if(reponse === 0) {
		mensaje("Error al registrar la expulsión");
	}	else {
		mensaje("Expulsión guardada");
	}	
}

// Funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras firmar
function recibirResultadoFirma( response ) {
	if(reponse === 0) {
		mensaje("Error al registrar la firma");
	}	else {
		mensaje("Firma guardada");
		limpiarTabla("contenedorTabla");
	}
}

// Funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras sancionar
function recibirResultadoSancion( response ) {
	if(response === 0) {
		mensaje("Error al registrar la sanción");
	}	else {
		mensaje("Sanción guardada");
		limpiarTabla("contenedorTablaSanciones");
		document.getElementById("tablaDeSanciones").style.display="none";
	}
}

// Funcion que vacia el elemento con ID indicado por parametro
const limpiarTabla = ( id ) => {
	if(document.getElementById(id).hasChildNodes()) {
			document.getElementById(id).removeChild(document.getElementById("table"));
		}
}