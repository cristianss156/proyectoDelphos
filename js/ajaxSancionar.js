import { serverCall, rutaPhp, mensaje } from "./module/functions.js";

var V_dni;

// Funcion que recoge el dni del alumno para buscarlo en la base de datos
document.getElementById("buscarSan").addEventListener("click", function() {
	clearTablaSan();

	V_dni = document.getElementById("dni_sancion").value;
	let ruta = rutaPhp + "buscarAmonestacionesSancion.php?datosBusqueda=" + V_dni;
	serverCall(ruta, recibirBusquedaAmoSan)
});

/* Funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras la busqueda por dni,
	si la busqueda a sido correcta llama a una funcion que se encarga de formatear los datos */
function recibirBusquedaAmoSan( response ) {
	if(response === "Sin resultado") {
		clearTablaSan();
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
		document.getElementById("tablaDeSanciones").style.display="none";
	} else {
		let datosBusqueda = JSON.parse(response);
		formatearBusquedaAmonestaciones(datosBusqueda);
	}
}

// Funcion que se encarga de formatear los datos y mostrarlos en una tabla al usuario
function formatearBusquedaAmonestaciones( ArrayAmoSan ) {
	clearTablaSan();
	var tabla = document.createElement('table');
	tabla.setAttribute("id", "table");

	for(let i in ArrayAmoSan) {
		let tr = document.createElement('tr');

		crearTd(V_dni, tr);
		crearTd(ArrayAmoSan[i].Nombre, tr);
		crearTd(ArrayAmoSan[i].NombreAsig, tr);
		crearTd("Pepe", tr);
		crearTd(ArrayAmoSan[i].descripcion, tr);

		let td = document.createElement('td');
		let boton = document.createElement('input');
		boton.setAttribute("type", "radio");
		boton.setAttribute("id", i);
		boton.setAttribute("name", "RBFirma");
		boton.setAttribute("value", ArrayAmoSan[i].CodAmonestacion);
		boton.setAttribute("onclick", "aplicarFechaSan('" + ArrayAmoSan[i].Fecha_Amonestacion + "'), recogerCod(this.value), recogerDNI('" + V_dni + "')");
		let label = crearRB(i);
		td.appendChild(boton);
		td.appendChild(label);
		td.setAttribute("class", "boton");
		tr.appendChild(td);

		tabla.appendChild(tr);
	}

	document.getElementById("contenedorTablaSanciones").appendChild(tabla);
	document.getElementById("tablaDeSanciones").style.display = "block";
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

// Funcion que vacia el elemento "contenedorTablaSanciones"
const clearTablaSan = () => {
	var tabla = document.getElementById("contenedorTablaSanciones");

	if(tabla.hasChildNodes()) {
			tabla.removeChild(document.getElementById("table"));
		}	
}