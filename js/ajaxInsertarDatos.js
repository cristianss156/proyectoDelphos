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
function recogerCod( _codigo ) {
	_cod = _codigo;
}

// Funcion que recoge si hay que firmar una amonestacion o una expulsion
function recogerTipo( _tipoFirma ) {
	_tipo = _tipoFirma;
}

//funcion que recoge el dni del alumno para utilizarlo en las distintas funciones
function recogerDNI( _dni ) {
	v_dni = _dni;
}

//funcion que recibe los datos que se necesitan para grabar una amonestacion
function amonestar( _curso, _alumno, _fecha, _hora, _asignatura, _causa ) {
	var datosAmonestacion = {
		curso: _curso,
		profesor: usuario,
		alumno: _alumno,
		fecha: _fecha,
		hora: _hora,
		asignatura: _asignatura,
		causa:_causa
	};

	var jsonstring = JSON.stringify(datosAmonestacion);
	let ruta = rutaPhp + "amonestar.php?datosAmonestacion=" + jsonstring;
	serverCall(ruta, recibirResultadoAmonestacion);
}

//funcion que recibe los datos que se necesitan para grabar una expulsion
function expulsar( _curso, _alumno, _fecha, _hora, _asignatura, _causa ) {
	var datosExpulsion = {
		curso: _curso,
		profesor: usuario,
		alumno: _alumno,
		fecha: _fecha,
		hora: _hora,
		asignatura: _asignatura,
		causa: _causa,
		tipo: "normal"
	};

	var jsonstring = JSON.stringify(datosExpulsion);
	let ruta = rutaPhp + "expulsar.php?datosExpulsion=" + jsonstring;
	serverCall(ruta, recibirResultadoExpulsion);
}

//funcion que recibe los datos que se necesitan para grabar una expulsion directa con sancion
function expulsarSancion( _curso, _alumno, _fecha, _hora, _asignatura, _causa ) {
	var datosExpulsion = {
		curso: _curso,
		profesor: usuario,
		alumno: _alumno,
		fecha: _fecha,
		hora: _hora,
		asignatura: _asignatura,
		causa: _causa,
		tipo: "SancionDirecta"
	};

	var jsonstring = JSON.stringify(datosExpulsion);
	let ruta = rutaPhp + "expulsar.php?datosExpulsion=" + jsonstring;
	serverCall(ruta, recibirResultadoExpulsion);
}

//funcion que recibe los datos que se necesitan para grabar la firma de una expulsion o una amonestacion
function firmar( _fecha ) {
	var datosFirma = {
		codigo: _cod,
		fecha: _fecha,
		tipo: _tipo
	};

	var jsonstring = JSON.stringify(datosFirma);
	let ruta = rutaPhp + "firmar.php?datosFirma=" + jsonstring;
	serverCall(ruta, recibirResultadoFirma);
}

//funcion que recibe los datos que se necesitan para grabar una sancion
function sancionar( _fecha, _sancion ) {
	var datosSancion = {
		codigo: _cod,
		profesor: usuario,
		fecha: _fecha,
		alumno: v_dni,
		sancion: _sancion
	};

	var jsonstring = JSON.stringify(datosSancion);
	let ruta = rutaPhp + "sancionar.php?datosSancion=" + jsonstring;
	serverCall(ruta, recibirResultadoSancion);
}

//funcion llamada por "compruebaSesion()" que recoge los datos del servidor y guarda en la variable global "usuario"
//el codigo del usuario para poder usarlo en el resto de funciones
function recibirDatosLogin( response ) {
	let profesor = JSON.parse(response);
	usuario = profesor[0];
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras amonestar
function recibirResultadoAmonestacion( response ) {
	if(response === "Error al insertar.") {
		mensaje("Error al registrar la amonestación");
	}	else {
		mensaje("Amonestación guardada");
	}
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras expulsar
function recibirResultadoExpulsion( response ) {
	if(reponse === "Error al insertar.") {
		mensaje("Error al registrar la expulsión");
	}	else {
		mensaje("Expulsión guardada");
	}	
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras firmar
function recibirResultadoFirma( response ) {
	if(reponse === "0") {
		mensaje("Error al registrar la firma");
	}	else {
		mensaje("Firma guardada");
		limpiarTabla("contenedorTabla");
	}
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras sancionar
function recibirResultadoSancion( response ) {
	if(response === "0") {
		mensaje("Error al registrar la sanción");
	}	else {
		mensaje("Sanción guardada");
		limpiarTabla("contenedorTablaSanciones");
		document.getElementById("tablaDeSanciones").style.display="none";
	}
}

const limpiarTabla = ( id ) => {
	if(document.getElementById(id).hasChildNodes()) {
			document.getElementById(id).removeChild(document.getElementById("table"));
		}
}