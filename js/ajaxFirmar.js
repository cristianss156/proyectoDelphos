var objAjax;
var tipoBusqueda;
var V_dni;

function crearAjax(){
	if(window.XMLHttpRequest){
		objAjax=new XMLHttpRequest();
	}
	else{
		objAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

//funcion que recibe el dni del alumno y el tipo de busqueda que hay que hacer (amonestaciones o expulsiones)
//y realiza la busqueda
function buscar(_tipo, _dni){
	crearAjax();

	if(document.getElementById("contenedorTabla").hasChildNodes()){
		document.getElementById("contenedorTabla").removeChild(document.getElementById("table"));
	}

	var datosBusqueda={
		tipo:_tipo,
		dni:_dni
	};

	tipoBusqueda=_tipo;
	V_dni=_dni;

	var jsonstring=JSON.stringify(datosBusqueda);
	objAjax.open("GET","http://localhost/Trabajo Cliente/php/buscar.php?datosBusqueda="+jsonstring, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirBusqueda;
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion,
//si la respuesta es correcta se llama a una funcion concreta dependiendo de si se quiere firma una amonestacion o una expulsion
function recibirBusqueda(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		if(objAjax.responseText==="Sin resultado"){
			if(document.getElementById("contenedorTabla").hasChildNodes()){
				document.getElementById("contenedorTabla").removeChild(document.getElementById("table"));
			}
			document.getElementById("fech_firma").min="";
			document.getElementById("fech_firma").value="";
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="No se han encontrado datos que coincidan con tu busqueda";
			document.getElementById("mensaje_info").style.display="block";
		}
		else{
			var datosBusqueda=[];
			datosBusqueda=JSON.parse(objAjax.responseText);
			if(tipoBusqueda==="amonestaciones"){
				formatearBusqueda(datosBusqueda);
			}
			else if(tipoBusqueda==="expulsiones"){
				formatearBusquedaExpulsiones(datosBusqueda);
			}
		}
	}
}

//funcion que formatea los datos de las amonestaciones en una tabla
function formatearBusqueda(ArrayBusqueda){
	if(document.getElementById("contenedorTabla").hasChildNodes()){
		document.getElementById("contenedorTabla").removeChild(document.getElementById("table"));
	}

	var tabla=document.createElement('table');
	tabla.setAttribute("id", "table");

	for(var i in ArrayBusqueda){
		tr=document.createElement('tr');

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
	td.innerHTML="Pepe";
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
	if(document.getElementById("contenedorTabla").hasChildNodes()){
		document.getElementById("contenedorTabla").removeChild(document.getElementById("table"));
	}

	var tabla=document.createElement('table');
	tabla.setAttribute("id", "table");

	for(var i in ArrayBusqueda){
		tr=document.createElement('tr');

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