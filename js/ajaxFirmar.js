import { serverCall, rutaPhp, mensaje } from "./module/functions.js";

var tipoBusqueda;
var V_dni;

/* Funcion que recibe el dni del alumno y el tipo de busqueda que hay que hacer (amonestaciones o expulsiones)
	y realiza la busqueda */
 var inputs = document.getElementsByClassName("filtro");
 for (let i = 0; i < inputs.length; i++) {
 	inputs[i].addEventListener("click", function() {
	 	clearTable();

		let datosBusqueda = {
			tipo: this.value,
			dni: document.getElementById("dni").value
		};

		tipoBusqueda = this.value;
		V_dni = document.getElementById("dni").value;

		let jsonstring = JSON.stringify(datosBusqueda);
		let ruta = rutaPhp + "buscar.php?datosBusqueda=" + jsonstring;
		serverCall(ruta, recibirBusqueda);
	 })
 };

/* Funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion,
	si la respuesta es correcta se llama a una funcion concreta dependiendo de si se quiere
	firma una amonestacion o una expulsion */
function recibirBusqueda( response ) {
		if(response === 0) {
		clearTable();
		document.getElementById("fech_firma").min = "";
		document.getElementById("fech_firma").value = "";
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	} else {
		let respuesta = JSON.parse(response);
		if(tipoBusqueda === "amonestaciones") {
			formatearBusqueda(respuesta);
		} else if(tipoBusqueda === "expulsiones") {
			formatearBusquedaExpulsiones(respuesta);
		}
	}
}

// Funcion que formatea los datos de las amonestaciones en una tabla
function formatearBusqueda( ArrayBusqueda ) {
	clearTable();

	var tabla = document.createElement('table');
	tabla.setAttribute("id", "table");

	for(let i in ArrayBusqueda) {
		var tr = document.createElement('tr');

		crearTd(V_dni, tr);
		crearTd(ArrayBusqueda[i]["Nombre"], tr);
		crearTd(ArrayBusqueda[i]["NombreAsig"], tr);
		crearTd("Pepe", tr);
		crearTd(ArrayBusqueda[i]["descripcion"], tr);

		let td = document.createElement('td');
		let boton = document.createElement('input');
		boton.setAttribute("type", "radio");
		boton.setAttribute("id", i);
		boton.setAttribute("name", "RBFirma");
		boton.setAttribute("value", ArrayBusqueda[i]["CodAmonestacion"]);
		boton.setAttribute("onclick", "aplicarFecha('"+ArrayBusqueda[i]["Fecha_Amonestacion"]+"'), recogerCod(this.value)");
		let label = crearRB(i);
		td.appendChild(boton);
		td.appendChild(label);
		td.setAttribute("class", "boton");
		tr.appendChild(td);

		tabla.appendChild(tr);
	}

	document.getElementById("contenedorTabla").appendChild(tabla);
}

// Funcion que formatea los datos de las expulsiones en una tabla
function formatearBusquedaExpulsiones( ArrayBusqueda ) {
	clearTable();

	var tabla = document.createElement('table');
	tabla.setAttribute("id", "table");

	for(let i in ArrayBusqueda) {
		var tr = document.createElement('tr');

		crearTd(V_dni, tr);
		crearTd(ArrayBusqueda[i].Nombre, tr);
		crearTd(ArrayBusqueda[i].NombreAsig, tr);
		crearTd("pepe", tr);
		crearTd(ArrayBusqueda[i].descripcion, tr);

		let td = document.createElement('td');
		let boton = document.createElement('input');
		boton.setAttribute("type", "radio");
		boton.setAttribute("id", i);
		boton.setAttribute("name", "RBFirma");
		boton.setAttribute("value", ArrayBusqueda[i].CodExpulsiones);
		boton.setAttribute("onclick", "aplicarFecha('"+ArrayBusqueda[i].Fecha_Expulsion+"'), recogerCod(this.value)");
		let label = crearRB(i);
		td.appendChild(boton);
		td.appendChild(label);
		td.setAttribute("class", "boton");
		tr.appendChild(td);

		tabla.appendChild(tr);
	}

	document.getElementById("contenedorTabla").appendChild(tabla);
}

// Funcion que vacia el elemento con ID "contenedorTabla"
const clearTable = () => {
	let tabla = document.getElementById("contenedorTabla");
	if(tabla.hasChildNodes()) {
		tabla.removeChild(document.getElementById("table"));
	}
}

// Funcion que crea un td con contenido y lo inserta en el elemento pasado
const crearTd = ( q, obj ) => {
	let td = document.createElement('td');
	td.innerHTML = q;
	td.setAttribute("class", "celda");
	obj.appendChild(td);
}

// Funcion que crea un radio button presonalizado y lo devuelve
const crearRB = ( id ) => {
	let label = document.createElement("label");
	label.setAttribute("for", id);
	let out = document.createElement("div");
	out.setAttribute("class", "outsiderb");
	let dentro = document.createElement("div");
	dentro.setAttribute("class", "insiderb");
	out.appendChild(dentro);
	label.appendChild(out);
	return label;
}