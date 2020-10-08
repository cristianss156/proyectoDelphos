import { serverCall, rutaPhp, mensaje, imprimir } from "./module/functions.js";

// Evento click que cierra la sesion de php
document.getElementById("salir").addEventListener("click", function() {
	let ruta = rutaPhp + "cerrarSesion.php";
	serverCall(ruta);

	location.href = "index.html";
});

// Evento que recoge los datos de la sesion de php al finalizar la carga de listados.html
document.addEventListener("DOMContentLoaded", function() {
	let ruta = rutaPhp + "verSesion.php";
	serverCall(ruta, recibirDatosLogin);
});

// Evento que manda imprimir la pulsar el boton
document.getElementById("btnImprimir").addEventListener("click", function() {
	imprimir();
});

// Funcion que rellena el select de profesores con los profesores
function rellenarProf() {
	let ruta = rutaPhp + "buscarProf.php";
	serverCall(ruta, recibirPorf);
}

// Funcion que se encarga de rellenar el select con los cursos
function rellenarCursos(){
	let ruta = rutaPhp + "listarCursos.php";
	serverCall(ruta, recibirCursos);
}

// Funcion que recoge el dni de un alumno y lo utiliza para buscar sus amonestaciones y expulsiones
document.getElementById("buscarAmoExpAlumn").addEventListener("click", function() {
	var dni = document.getElementById("dniAlumn").value;
	let ruta = rutaPhp + "buscarAmoExpAlumn.php?dni=" + dni;
	serverCall(ruta, recibirAmoExpAlumn);
});

// Funcion que busca a todos los alumnos con amonestaciones y/o expulsiones sin firmar
document.getElementById("filtro_dos").addEventListener("click", function() {
	let ruta = rutaPhp + "buscarAlumnosSinFirma.php";
	serverCall(ruta, recibirAlumnoSinFirma);
});

// Funcion que recoge el codigo de un profesor y lo utiliza para buscar las amonestaciones de ese profesor
document.getElementById("buscarAmoProf").addEventListener("click", function() {
	var prof = document.getElementById("codProf").value;
	let ruta = rutaPhp + "buscarAmoProf.php?prof=" + prof;
	serverCall(ruta, recibirAmoProf);
});


// Funcion que recoge un curso y busca las expulsiones y amonestaciones de los alumnos de ese grupo
document.getElementById("buscarAmoExpGrp").addEventListener("click", function() {
	var grupo = document.getElementById("codGrp").value;
	let ruta = rutaPhp + "buscarAmoExpGrp.php?grp=" + grupo;
	serverCall(ruta, recibirAmoExpGrp);
});

// Funcion que busca las amonestaciones totales de cada profesor
document.getElementById("filtro_cinco").addEventListener("click", function() {
	let ruta = rutaPhp + "buscarAmoTotal.php";
	serverCall(ruta, recibirAmoTotales);
});

/* Funcion que recibe los datos de la sesion y comprueba si hay algun usuario registrado
	si no hay ningun usuario se redirecciona a index.html */
function recibirDatosLogin( response ) {
	var profesor=[];
			
	if(response === 0) {
		location.href = "index.html";
	} else {
		let profesor = JSON.parse(response);
		document.getElementById("inicialLog").innerHTML = profesor[1][0];
		document.getElementById("userLog").style.display = "flex";
		rellenarProf();
	}
}

// Funcion que comprueba la respuesta del servidor al consultar los profesores
function recibirPorf( response ) {
	let profesores = JSON.parse(response);
	formatearProfs(profesores);
}

// Funcion que comprueba la respuesta del servidor al consultar los cursos
function recibirCursos( response ) {
	let datosCursos = JSON.parse(response);
	formatearCursos(datosCursos);
}

// Funcion que comprueba la respuesta del servidor al consultar las amonestaciones y expulsiones de un alumno
function recibirAmoExpAlumn( response ) {
	let AmoExpAlumn = JSON.parse(response);
	if(AmoExpAlumn[0] !== null || AmoExpAlumn[1] !== null) {
		formatearAmoExp(AmoExpAlumn);
	}	else {
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}
}

// Funcion que comprueba la respuesta del servidor al consultar los alumnos con amonestaciones y/o expulsiones sin firma
function recibirAlumnoSinFirma( response ) {
	let alumn = JSON.parse(response);
	if(alumn[0] !== null || alumn[1] !== null) {
		formatearBusqueda(alumn);
	}	else {
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}
}

// Funcion que comprueba la respuesta del servidor al consultar las amonestaciones de un profesor
function recibirAmoProf( response ) {
	if(response === 0){
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}	else {
		let total = JSON.parse(response);
		formatearBusquedaAmoProf(total);
	}
}

// Funcion que comprueba la respuesta del servidor al consultar las amonestaciones y expulsiones de un grupo
function recibirAmoExpGrp( response ) {
	let AmoExpGrp = JSON.parse(response);
	if(AmoExpGrp[0] !== null || AmoExpGrp[1] !== null){
		formatearBusquedaAmoExpGrp(AmoExpGrp);
	}	else {
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}
}

// Funcion que comprueba la respuesta del servidor al consultar las amonestaciones totales de cada profesor
function recibirAmoTotales( response ) {
	if(response === 0) {
		clearLista();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	}	else {
		let total = JSON.parse(response);
		formatearBusquedaTotal(total);
	}
}

// Funcion que formatea los datos de los profesores en el select correspondiente
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

// Funcion que formatea los datos de los cursos en el select correspondiente
function formatearCursos( ArrayCursos ) {
	var select = document.getElementById('codGrp');

	for(let i in ArrayCursos) {
		let option = document.createElement("option");
		option.value = ArrayCursos[i].CodCurso;
		option.innerHTML = ArrayCursos[i].CodCurso;

		select.appendChild(option);
	}
}

// Funcion que formatea los datos de las amonestaciones y expulsiones de un alumno
function formatearAmoExp( ArrayAmoExpalumn ) {
	clearLista();

	var tabla = document.createElement('div');
	tabla.setAttribute("id", "table");

	/*let alumno = document.createElement('div');
	alumno.setAttribute('class', 'tituloListas');
	let span = document.createElement('span');
	span.innerHTML = ArrayAmoExpalumn[0][0]["NOMBRE"] + " " + ArrayAmoExpalumn[0][0]["APELLIDOS"];
	alumno.appendChild(span);
	tabla.appendChild(alumno);*/

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

// Funcion que formatea los datos de las amonestaciones y expulsiones sin firma de todos los alumnos
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

// Funcion que formatea los datos de las amonestaciones de un profesor
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

// Funcion que formatea los datos de las amonestaciones y expulsiones de un grupo
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

// Funcion que formatea los datos de las amonestaciones totales de cada profesor
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

// Funcion que limpia elemento "Listas"
const clearLista = () => {
	if(document.getElementById("Listas").hasChildNodes()) {
		document.getElementById("Listas").removeChild(document.getElementById("table"));
	}	
};