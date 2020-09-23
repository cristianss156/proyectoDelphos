import { serverCall, rutaPhp, mensaje } from "./module/functions.js";

var tipoBusqueda;
var V_dni;

/* funcion que recibe el dni del alumno y el tipo de busqueda que hay que hacer (amonestaciones o expulsiones)
 y realiza la busqueda */
 var inputs = document.getElementsByClassName("filtro");
 for (let i = 0; i < inputs.length; i++) {
 	inputs[i].addEventListener("click", function() {
	 	clearTable();

		var datosBusqueda = {
			tipo: this.value,
			dni: document.getElementById("dni").value
		};

		tipoBusqueda = _tipo;
		V_dni = document.getElementById("dni").value;

		var jsonstring = JSON.stringify(datosBusqueda);
		let ruta = rutaPhp + "buscar.php?datosBusqueda=" + jsonstring;
		serverCall(ruta, recibirBusqueda);
	 })
 };

/* funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion,
si la respuesta es correcta se llama a una funcion concreta dependiendo de si se quiere 
firma una amonestacion o una expulsion */
function recibirBusqueda( response ){
	if(response === "Sin resultado") {
		clearTable();

		document.getElementById("fech_firma").min = "";
		document.getElementById("fech_firma").value = "";
		mensaje("No se han encontrado datos que coincidan con tu busqueda");
	} else {
		let datosBusqueda = [];
		datosBusqueda = JSON.parse(response);
		if(tipoBusqueda === "amonestaciones") {
			formatearBusqueda(datosBusqueda);
		} else if(tipoBusqueda === "expulsiones") {
			formatearBusquedaExpulsiones(datosBusqueda);
		}
	}
}

// funcion que formatea los datos de las amonestaciones en una tabla
function formatearBusqueda(ArrayBusqueda){
	clearTable();

	var tabla = document.createElement('table');
	tabla.setAttribute("id", "table");

	for(var i in ArrayBusqueda) {
		var tr = document.createElement('tr');

		td = document.createElement('td');
		td.innerHTML = V_dni;
		td.setAttribute("class", "celda");
		tr.appendChild(td);

		td = document.createElement('td');
		td.innerHTML = ArrayBusqueda[i].Nombre;
		td.setAttribute("class", "celda");
		tr.appendChild(td);

		td = document.createElement('td');
		td.innerHTML = ArrayBusqueda[i].NombreAsig;
		td.setAttribute("class", "celda");
		tr.appendChild(td);

		td = document.createElement('td');
		td.innerHTML = "Pepe";
		td.setAttribute("class", "celda");
		tr.appendChild(td);

		td = document.createElement('td');
		td.innerHTML = ArrayBusqueda[i].descripcion;
		td.setAttribute("class", "celda");
		tr.appendChild(td);

		td=document.createElement('td');
		boton=document.createElement('input');
		boton.setAttribute("type","radio");
		boton.setAttribute("id",i);
		boton.setAttribute("name","RBFirma");
		boton.setAttribute("value",ArrayBusqueda[i].CodAmonestacion);
		boton.setAttribute("onclick","aplicarFecha('"+ArrayBusqueda[i].Fecha_Amonestacion+"'), recogerCod(this.value)");
		label=document.createElement("label");
		label.setAttribute("for",i);
		out=document.createElement("div");
		out.setAttribute("class","outsiderb");
		dentro=document.createElement("div");
		dentro.setAttribute("class","insiderb");
		out.appendChild(dentro);
		label.appendChild(out);
		td.appendChild(boton);
		td.appendChild(label);
		td.setAttribute("class", "boton");
		tr.appendChild(td);

		tabla.appendChild(tr);
	}

	document.getElementById("contenedorTabla").appendChild(tabla);
}

//funcion que formatea los datos de las expulsiones en una tabla
function formatearBusquedaExpulsiones(ArrayBusqueda){
	clearTable()

	var tabla = document.createElement('table');
	tabla.setAttribute("id", "table");

	for(var i in ArrayBusqueda){
		var tr = document.createElement('tr');

	td=document.createElement('td');
	td.innerHTML=V_dni;
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	td.innerHTML=ArrayBusqueda[i].Nombre;
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	td.innerHTML=ArrayBusqueda[i].NombreAsig;
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	td.innerHTML="pepe";
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	td.innerHTML=ArrayBusqueda[i].descripcion;
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	boton=document.createElement('input');
	boton.setAttribute("type","radio");
	boton.setAttribute("id",i);
	boton.setAttribute("name","RBFirma");
	boton.setAttribute("value",ArrayBusqueda[i].CodExpulsiones);
	boton.setAttribute("onclick","aplicarFecha('"+ArrayBusqueda[i].Fecha_Expulsion+"'), recogerCod(this.value)");
	label=document.createElement("label");
	label.setAttribute("for",i);
	out=document.createElement("div");
	out.setAttribute("class","outsiderb");
	dentro=document.createElement("div");
	dentro.setAttribute("class","insiderb");
	out.appendChild(dentro);
	label.appendChild(out);
	td.appendChild(boton);
	td.appendChild(label);
	td.setAttribute("class", "boton");
	tr.appendChild(td);

	tabla.appendChild(tr);
	}

	document.getElementById("contenedorTabla").appendChild(tabla);
}

const clearTable = () => {
	if(document.getElementById("contenedorTabla").hasChildNodes()) {
		document.getElementById("contenedorTabla").removeChild(document.getElementById("table"));
	}
}