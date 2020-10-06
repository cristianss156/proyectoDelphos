import { serverCall, rutaPhp, mensaje } from "./module/functions.js";

//funcion que cierra la sesion del usuario actual
function salir(){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/cerrarSesion.php", true);
	objAjax.send();

	location.href = "index.html";
}

// Evento que recoge los datos de la sesion de php al finalizar la carga de listados.html
document.addEventListener("DOMContentLoaded", function() {
	let ruta = rutaPhp + "verSesion.php";
	serverCall(ruta, recibirDatosLogin);
});

//funcion que rellena el select de profesores con los profesores
function rellenarProf() {
	let ruta = rutaPhp + "buscarProf.php";
	serverCall(ruta, recibirPorf);
}

//funcion que se encarga de rellenar el select con los cursos
function rellenarCursos(){
	let ruta = rutaPhp + "listarCursos.php";
	serverCall(ruta, recibirCursos);
}

//funcion que recoge el dni de un alumno y lo utiliza para buscar sus amonestaciones y expulsiones
function buscarAmoExp( dni ) {
	let ruta = rutaPhp + "buscarAmoExpAlumn.php?dni=" + dni;
	serverCall(ruta, recibirAmoExpAlumn);
}

//funcion que busca a todos los alumnos con amonestaciones y/o expulsiones sin firmar
function alumnosSinFirma() {
	let ruta = rutaPhp + "buscarAlumnosSinFirma.php";
	serverCall(ruta, recibirAlumnoSinFirma);
}

//funcion que recoge el codigo de un profesor y lo utiliza para buscar las amonestaciones de ese profesor
function amoProfesor( prof ) {
	let ruta = rutaPhp + "buscarAmoProf.php?prof=" + prof;
	serverCall(ruta, recibirAmoProf);
}


//funcion que recoge un curso y busca las expulsiones y amonestaciones de los alumnos de ese grupo
function amoExpGrp( grupo ) {
	let ruta = rutaPhp + "buscarAmoExpGrp.php?grp=" + grupo;
	serverCall(ruta, recibirAmoExpGrp);
}

//funcion que busca las amonestaciones totales de cada profesor
function profesoresAmoTotal() {
	let ruta = rutaPhp + "buscarAmoTotal.php";
	serverCall(ruta, recibirAmoTotales);
}

/* Funcion que recibe los datos de la sesion y comprueba si hay algun usuario registrado
si no hay ningun usuario se redirecciona a index.html */
function recibirDatosLogin( response ) {
	var profesor=[];
			
	if(response === "Sin datos") {
		location.href = "index.html";
	} else {
		let profesor = JSON.parse(response);
		document.getElementById("inicialLog").innerHTML = profesor[1][0];
		document.getElementById("userLog").style.display = "flex";
		rellenarProf();
	}
}

//funcion que comprueba la respuesta del servidor al consultar los profesores
function recibirPorf( response ) {
	let profesores = JSON.parse(response);
	formatearProfs(profesores);
}

//funcion que comprueba la respuesta del servidor al consultar los cursos
function recibirCursos( response ) {
	let datosCursos = JSON.parse(response);
	formatearCursos(datosCursos);
}

//funcion que comprueba la respuesta del servidor al consultar las amonestaciones y expulsiones de un alumno
function recibirAmoExpAlumn( response ) {
	let AmoExpAlumn = JSON.parse(response);
	if(AmoExpAlumn[0] !== null || AmoExpAlumn[1] !== null) {
		formatearAmoExp(AmoExpAlumn);
	}	else {
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}
}

//funcion que comprueba la respuesta del servidor al consultar los alumnos con amonestaciones y/o expulsiones sin firma
function recibirAlumnoSinFirma( response ) {
	let alumn = JSON.parse(response);
	if(alumn[0] !== null || alumn[1] !== null) {
		formatearBusqueda(alumn);
	}	else {
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}
}

//funcion que comprueba la respuesta del servidor al consultar las amonestaciones de un profesor
function recibirAmoProf( response ) {
	if(response === "null"){
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}	else {
		let total = JSON.parse(response);
		formatearBusquedaAmoProf(total);
	}
}

//funcion que comprueba la respuesta del servidor al consultar las amonestaciones y expulsiones de un grupo
function recibirAmoExpGrp( response ) {
	let AmoExpGrp = JSON.parse(response);
	if(AmoExpGrp[0] !== null || AmoExpGrp[1] !== null){
		formatearBusquedaAmoExpGrp(AmoExpGrp);
	}	else {
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}
}

//funcion que comprueba la respuesta del servidor al consultar las amonestaciones totales de cada profesor
function recibirAmoTotales( response ) {
	if(response === "null") {
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}	else {
		let total = JSON.parse(response);
		formatearBusquedaTotal(total);
	}
}

//funcion que formatea los datos de los profesores en el select correspondiente
function formatearProfs( ArrayProfs ) {
	var select = document.getElementById("codProf");

	while(select.hasChildNodes()) {
		select.removeChild(select.firstChild);
	}

	select.appendChild(document.createElement("option"));

	for(let i in ArrayProfs) {
		let option = document.createElement("option");
		option.value = ArrayProfs[i].CodProfesor;
		option.innerHTML = ArrayProfs[i].Nombre + " " + ArrayProfs[i].Apellidos;

		select.appendChild(option);
	}

	rellenarCursos();
}

//funcion que formatea los datos de los cursos en el select correspondiente
function formatearCursos( ArrayCursos ) {
	var select = document.getElementById('codGrp');

	for(let i in ArrayCursos) {
		let option = document.createElement("option");
		option.value = ArrayCursos[i].CodCurso;
		option.innerHTML = ArrayCursos[i].CodCurso;

		select.appendChild(option);
	}
}

//funcion que formatea los datos de las amonestaciones y expulsiones de un alumno
function formatearAmoExp( ArrayAmoExpalumn ) {
	clearLista();

	var tabla = document.createElement('div');
	tabla.setAttribute("id", "table");

	let alumno = document.createElement('div');
	alumno.setAttribute('class', 'tituloListas');
	let span = document.createElement('span');
	span.innerHTML = ArrayAmoExpalumn[i][0]["NOMBRE"] + " " + ArrayAmoExpalumn[i][0]["APELLIDOS"];
	alumno.appendChild(span);
	tabla.appendChild(alumno);

	for(let i in ArrayAmoExpalumn) {
		if(ArrayAmoExpalumn[i] !== null) {
			for(let j in ArrayAmoExpalumn[i]) {
				let div = document.createElement('div');
				div.setAttribute('class', 'itemLista');
				let span = document.createElement('span');
				span.setAttribute('class', 'span');
				span.innerHTML= "<b>Causa:</b> " + ArrayAmoExpalumn[i][j]["CAUSA"] + "<br><b>Fecha:</b> " + ArrayAmoExpalumn[i][j]["FECHA"];
				div.appendChild(span);
				tabla.appendChild(div);
			}
		}
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display = "block";
}

//funcion que formatea los datos de las amonestaciones y expulsiones sin firma de todos los alumnos
function formatearBusqueda( ArrayAlumn ) {
	clearLista();

	var tabla = document.createElement('div');
	tabla.setAttribute("id", "table");

	for(let i in ArrayAlumn) {
		if(ArrayAlumn[i] !== null) {
			let titulo = document.createElement('div');
			titulo.setAttribute('class', 'tituloListas');
			let span = document.createElement('span');
			span.innerHTML = "Amonestaciones";
			titulo.appendChild(span);
			tabla.appendChild(titulo);

			for(let j in ArrayAlumn[i]) {
				let div = document.createElement('div');
				div.setAttribute('class', 'itemLista');
				let span = document.createElement('span');
				span.setAttribute('class', 'span');
				span.innerHTML = "<b>DNI:</b> " + ArrayAlumn[i][j]["DNI"] + "<br><b>Nombre:</b> " + ArrayAlumn[i][j]["NOMBRE"]
				+ " " + ArrayAlumn[i][j]["APELLIDOS"] + "<br><b>Curso:</b> " + ArrayAlumn[i][j]["CURSO"] + "<b>Cantidad:</b> "
				+ ArrayAlumn[i][j]["CUENTA"];
				div.appendChild(span);
				tabla.appendChild(div);
			}
		}
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display = "block";
}

//funcion que formatea los datos de las amonestaciones de un profesor
function formatearBusquedaAmoProf( ArrayAmoProf ) {
	clearLista();

	var tabla = document.createElement('div');
	tabla.setAttribute("id", "table");

	let prof = document.createElement('div');
	prof.setAttribute('class', 'tituloListas');
	let spanprof = document.createElement('span');
	spanprof.innerHTML = "Amonestaciones";
	prof.appendChild(spanprof);
	tabla.appendChild(prof);

	for(let i in ArrayAmoProf[0]) {
		let div = document.createElement('div');
		div.setAttribute('class', 'itemLista');
		let span = document.createElement('span');
		span.setAttribute('class', 'span');
		span.innerHTML = "<b>DNI:</b> " + ArrayAmoProf[0][i]["DNI"] + "<b>Nombre:</b> " + ArrayAmoProf[0][i]["NOMBRE"] +
		" " + ArrayAmoProf[0][i]["APELLIDOS"] + "<br><b>Causa:</b> " + ArrayAmoProf[0][i]["CAUSA"] + "<b>Fecha:</b> "
		+ ArrayAmoProf[0][i]["FECHA"];
		div.appendChild(span);
		tabla.appendChild(div);
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display = "block";
}

//funcion que formatea los datos de las amonestaciones y expulsiones de un grupo
function formatearBusquedaAmoExpGrp( ArrayAmoExpGrp ) {
	clearLista();

	var tabla = document.createElement('div');
	tabla.setAttribute("id", "table");

	let titulo = document.createElement('div');
	titulo.setAttribute('class', 'tituloListas');
	let span = document.createElement('span');
	span.innerHTML = "Curso "+ArrayAmoExpGrp[0][0]["CURSO"];
	titulo.appendChild(span);
	tabla.appendChild(titulo);

	for(let i in ArrayAmoExpGrp) {
		if(ArrayAmoExpGrp[i] !== null) {
			for(let j in ArrayAmoExpGrp[i]) {
				let div = document.createElement('div');
				div.setAttribute('class', 'itemLista');
				let span = document.createElement('span');
				span.setAttribute('class', 'span');
				span.innerHTML = "<b>DNI:</b> " + ArrayAmoExpGrp[i][j]["DNI"] + "<b>Nombre:</b> " + ArrayAmoExpGrp[i][j]["NOMBRE"] +
				" " + ArrayAmoExpGrp[i][j]["APELLIDOS"] + "<br><b>Cantidad:</b> " + ArrayAmoExpGrp[i][j]["CUENTA"];
				div.appendChild(span);
				tabla.appendChild(div);
			}
		}
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display = "block";
}

//funcion que formatea los datos de las amonestaciones totales de cada profesor
function formatearBusquedaTotal( ArrayTotal ) {
	clearLista();

	var tabla = document.createElement('div');
	tabla.setAttribute("id", "table");

	let prof = document.createElement('div');
	prof.setAttribute('class', 'tituloListas');
	let spanprof = document.createElement('span');
	spanprof.innerHTML = "Profesores";
	prof.appendChild(spanprof);
	tabla.appendChild(prof);

	for(let i in ArrayTotal[0]) {
		let div=document.createElement('div');
		div.setAttribute('class', 'itemLista');
		let span = document.createElement('span');
		span.setAttribute('class', 'span');
		span.innerHTML = "<b>Nombre:</b> " + ArrayTotal[0][i]["NOMBRE"] + " " + ArrayTotal[0][i]["APELLIDOS"] +
		"<br><b>Total de amonestaciones:</b> " + ArrayTotal[0][i]["TOTAL"];
		div.appendChild(span);
		tabla.appendChild(div);
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display = "block";
}

const clearLista = () => {
	if(document.getElementById("Listas").hasChildNodes()) {
		document.getElementById("Listas").removeChild(document.getElementById("table"));
	}	
};