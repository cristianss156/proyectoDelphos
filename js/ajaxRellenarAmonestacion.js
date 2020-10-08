import { serverCall, rutaPhp, mensaje } from "./module/functions.js";

var curso;

// Evento click que cierra la sesion de php
document.getElementById("salir").addEventListener("click", function() {
	let ruta = rutaPhp + "cerrarSesion.php";
	serverCall(ruta);

	location.href = "index.html";
});

// Evento que recoge los datos de la sesion de php al finalizar la carga de gestion.html
document.addEventListener("DOMContentLoaded", function() {
	let ruta = rutaPhp + "verSesion.php";
	serverCall(ruta, recibirDatosLoginGeneral);
});

// Funcion que se encarga de rellenar el select con los cursos
function rellenarCursos() {
	let ruta = rutaPhp + "listarCursos.php";
	serverCall(ruta, recibirCursos);
}

// Funcion que se encarga de rellenar el select con los alumnos en funcion del curso que recibe como parametro
document.getElementById("Curso").addEventListener("change", function() {
	curso = this.value;
	let ruta = rutaPhp + "listarAlumnos.php?curso=" + curso;
	serverCall(ruta, recibirAlumnos);
});

// Funcion que se encarga de rellenar el select con las asignaturas en funcion del curso que recibe como parametro
function rellenarAsignaturas( _curso ) {
	let ruta = rutaPhp + "listarAsignaturas.php?curso=" + _curso;
	serverCall(ruta, recibirAsignaturas);
}

// Funcion que se encarga de rellenar el select con las causas de amonestacion
function rellenarCausasAmonestacion() {
	let ruta = rutaPhp + "listarCausasAmonestacion.php";
	serverCall(ruta, recibirCausasAmonestacion);
}

// Funcion que se encarga de guardar en la base de datos una nueva causa de amonestacion
document.getElementById("crearAmo").addEventListener("click", function() {
	var nuevaCausaAmo = document.getElementById("nueva_Amonestacion").value;
	if(nuevaCausaAmo === "") {
		mensaje("Introduce una nueva causa de amonestación");
	}	else {
		let ruta = rutaPhp + "crearCausaAmonestacion.php?causa=" + nuevaCausaAmo;
		serverCall(ruta, recibirNuevaAmonestacion);
	}
});

// Funcion que comprueba que si hay algun usuario logeado al recagar la pagina
function recibirDatosLoginGeneral( response ) {
	var profesor=[];
			
	if(response === 0){
		location.href = "index.html";
	} else { 
		let profesor = JSON.parse(response);
		document.getElementById("inicialLog").innerHTML = profesor[1][0];
		document.getElementById("userLog").style.display = "flex";
		if(profesor[2] === "Profesor") {
			document.getElementById("expulsarSancion").style.display = "none";
			document.getElementById("listadosEnlace").style.display = "none";
			document.getElementById("sanciones").removeAttribute("onclick");
			document.getElementById("firmas").removeAttribute("onclick");
		} else {
			document.getElementById("listadosEnlace").style.display = "block";
		}
	}
	rellenarCursos();
}

// Funcion que comprueba la respuesta del servidor al consultar los cursos
function recibirCursos( response ) {
	let datosCursos = JSON.parse(response);
	formatearCursos(datosCursos);
}

// Funcion que comprueba la respuesta del servidor al consultar los alumnos
function recibirAlumnos( response ) {
	let datosAlumnos = JSON.parse(response);
	formatearAlumnos(datosAlumnos);
}

// Funcion que comprueba la respuesta del servidor al consultar las asignaturas
function recibirAsignaturas( response ) {
	let datosAsignaturas = JSON.parse(response);
	formatearAsignaturas(datosAsignaturas);
}

// Funcion que comprueba la respuesta del servidor al consultar las causas de amonestacion
function recibirCausasAmonestacion( response ) {
	let datosAmonestaciones = JSON.parse(response);
	formatearCausasAmonestacion(datosAmonestaciones);
}

// Funcion que comprueba la respuesta del servidor al crear una nueva causa de amonestacion
function recibirNuevaAmonestacion( response ) {
	mensaje("Vuelve a habilitar las causas para elegir la nueva causa");
	document.getElementById("nueva_Amonestacion").value = "";
	rellenarCausasAmonestacion();
}

// Funcion que formatea los datos de los cursos en el select correspondiente
function formatearCursos( ArrayCursos ) {
	var select = document.getElementById('Curso');

	for(let i in ArrayCursos) {
		let option = document.createElement("option");
		option.value = ArrayCursos[i].CodCurso;
		option.innerHTML = ArrayCursos[i].CodCurso;

		select.appendChild(option);
	}
	rellenarCausasAmonestacion();
}

// Funcion que formatea los datos de los alumnos en el select correspondiente
function formatearAlumnos( ArrayAlumnos ) {
	var select = crearSelect("alumno");

	for(let i in ArrayAlumnos) {
		let option = document.createElement("option");
		option.value = ArrayAlumnos[i].DNI;
		option.innerHTML = ArrayAlumnos[i].Nombre+" "+ArrayAlumnos[i].Apellidos;

		select.appendChild(option);
	}
	rellenarAsignaturas(curso);
}

// Funcion que formatea los datos de las asignaturas en el select correspondiente
function formatearAsignaturas( ArrayAsignaturas ) {
	var select = crearSelect("asignatura");

	for(let i in ArrayAsignaturas) {
		let option = document.createElement("option");
		option.value = ArrayAsignaturas[i].CodAsignatura;
		option.innerHTML = ArrayAsignaturas[i].NombreAsig;

		select.appendChild(option);
	}
}

// Funcion que formatea los datos de las causas de amonestacion en el select correspondiente
function formatearCausasAmonestacion( ArrayAmonestaciones ) {
	var select = crearSelect("causa_amo");

	for(let i in ArrayAmonestaciones) {
		let option = document.createElement("option");
		option.value = ArrayAmonestaciones[i].CodCausa_Amonestacion;
		option.innerHTML = ArrayAmonestaciones[i].descripcion;

		select.appendChild(option);
	}
}

// Funcion que vacia el select con ID pasado por parametro, le añade un option vacio y lo devuelve
const crearSelect = ( tipo ) => {
	var select = document.getElementById(tipo);

	while(select.hasChildNodes()) {
		select.removeChild(select.firstChild);
	}

	select.appendChild(document.createElement("option"));

	return select;
}