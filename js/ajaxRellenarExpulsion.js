import { serverCall, rutaPhp, mensaje } from "./module/functions.js";

var curso;

// Funcion que se encarga de rellenar el select con los cursos
document.getElementById("expulsiones").addEventListener("click",  function() {
	let ruta = rutaPhp + "listarCursos.php";
	serverCall(ruta, recibirCursosExpulsion);
})

// Funcion que se encarga de rellenar el select con los alumnos en funcion del curso que recibe como parametro
document.getElementById("Curso_Exp").addEventListener("change",function() {
	curso = this.value;
	let ruta = rutaPhp + "listarAlumnos.php?curso=" + curso;
	serverCall(ruta, recibirAlumnosExpulsion);
});

// Funcion que se encarga de rellenar el select con las asignaturas en funcion del curso que recibe como parametro
function rellenarAsignaturasExpulsion( _curso ) {
	let ruta = rutaPhp + "listarAsignaturas.php?curso=" + _curso;
	serverCall(ruta, recibirAsignaturasExpulsion);
}

// Funcion que se encarga de rellenar el select con las causas de expulsion
function rellenarCausasExpulsion() {
	let ruta = rutaPhp + "listarCausasExpulsion.php";
	serverCall(ruta, recibirCausasExpulsion);
}

// Funcion que se encarga de guardar en la base de datos una nueva causa de expulsion
document.getElementById("crearExp").addEventListener("click", function() {
	var nuevaCausaExp = document.getElementById("nueva_Expulsion").value;
	if(nuevaCausaExp === "") {
		mensaje("Introduce una nueva causa de expulsión");
	}	else {
		let ruta = rutaPhp + "crearCausaExpulsion.php?causa=" + nuevaCausaExp;
		serverCall(ruta, recibirNuevaExpulsion);
	}
});

// Funcion que comprueba la respuesta del servidor al consultar los cursos
function recibirCursosExpulsion( response ) {
	let datosCursos = JSON.parse(response);
	formatearCursosExpulsion(datosCursos);
}

// Funcion que comprueba la respuesta del servidor al consultar los alumnos
function recibirAlumnosExpulsion( response ) {
	let datosAlumnos = JSON.parse(response);
	formatearAlumnosExpulsion(datosAlumnos);
}

// Funcion que comprueba la respuesta del servidor al consultar las asignaturas
function recibirAsignaturasExpulsion( response ) {
	let datosAsignaturas = JSON.parse(response);
	formatearAsignaturasExpulsion(datosAsignaturas);
}

// Funcion que comprueba la respuesta del servidor al consultar las causas de expulsion
function recibirCausasExpulsion( response ) {
	let datosExpulsion = JSON.parse(response);
	formatearCausasExpulsion(datosExpulsion);
}

// Funcion que comprueba la respuesta del servidor al crear una nueva causa de expulsion
function recibirNuevaExpulsion( response ) {
	mensaje("Vuelve a habilitar las causas para elegir la nueva causa");
	document.getElementById("nueva_Expulsion").value = "";
	rellenarCausasExpulsion();
}

// Funcion que formatea los datos de los cursos en el select correspondiente
function formatearCursosExpulsion( ArrayCursos ) {
	var select = limpiarSelect("Curso_Exp");

	for(let i in ArrayCursos) {
		let option = document.createElement("option");
		option.value = ArrayCursos[i].CodCurso;
		option.innerHTML = ArrayCursos[i].CodCurso;

		select.appendChild(option);
	}
	rellenarCausasExpulsion();
}

// Funcion que formatea los datos de los alumnos en el select correspondiente
function formatearAlumnosExpulsion( ArrayAlumnos ) {
	var select = limpiarSelect("alumno_Exp");

	for(let i in ArrayAlumnos) {
		let option = document.createElement("option");
		option.value = ArrayAlumnos[i].DNI;
		option.innerHTML = ArrayAlumnos[i].Nombre + " " + ArrayAlumnos[i].Apellidos;

		select.appendChild(option);
	}
	rellenarAsignaturasExpulsion(curso);
}

// Funcion que formatea los datos de las asignaturas en el select correspondiente
function formatearAsignaturasExpulsion( ArrayAsignaturas ) {
	var select = limpiarSelect("asignatura_exp");

	for(let i in ArrayAsignaturas) {
		let option = document.createElement("option");
		option.value = ArrayAsignaturas[i].CodAsignatura;
		option.innerHTML = ArrayAsignaturas[i].NombreAsig;

		select.appendChild(option);
	}
}

// Funcion que formatea los datos de las causas de amonestacion en el select correspondiente
function formatearCausasExpulsion( ArrayExpulsiones ) {
	var select = limpiarSelect("causa_exp");

	for(let i in ArrayExpulsiones) {
		let option = document.createElement("option");
		option.value = ArrayExpulsiones[i].CodCausa_Expulsion;
		option.innerHTML = ArrayExpulsiones[i].descripcion;

		select.appendChild(option);
	}
}

// Funcion que vacia el select con ID pasado por parametro, le añade un option vacio y lo devuelve
const limpiarSelect = ( id ) => {
	var select = document.getElementById(id);

	while(select.hasChildNodes()) {
		select.removeChild(select.firstChild);
	}

	select.appendChild(document.createElement("option"));

	return select;
}