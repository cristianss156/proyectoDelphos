var objAjax;
var V_dni;
function crearAjax(){
	if(window.XMLHttpRequest){
		objAjax=new XMLHttpRequest();
	}
	else{
		objAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

//funcion que recoge el dni del alumno para buscarlo en la base de datos
function mostrarAmo(_dni){
	crearAjax();

	if(document.getElementById("contenedorTablaSanciones").hasChildNodes()){
		document.getElementById("contenedorTablaSanciones").removeChild(document.getElementById("table"));
	}

	V_dni=_dni;

	objAjax.open("GET","http://localhost/Trabajo Cliente/php/buscarAmonestacionesSancion.php?datosBusqueda="+_dni, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirBusquedaAmoSan;
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras la busqueda por dni,
//si la busqueda a sido correcta llama a una funcion que se encarga de formatear los datos
function recibirBusquedaAmoSan(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		if(objAjax.responseText==="Sin resultado"){
			if(document.getElementById("contenedorTablaSanciones").hasChildNodes()){
				document.getElementById("contenedorTablaSanciones").removeChild(document.getElementById("table"));
			}
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="No se han encontrado datos que coincidan con tu busqueda";
			document.getElementById("mensaje_info").style.display="block";
			document.getElementById("tablaDeSanciones").style.display="none";
		}
		else{
			var datosBusqueda=[];
			datosBusqueda=JSON.parse(objAjax.responseText);
			formatearBusquedaAmonestaciones(datosBusqueda);
		}
	}
}

//funcion que se encarga de formatear los datos y mostrarlos en una tabla al usuario
function formatearBusquedaAmonestaciones(ArrayAmoSan){
	if(document.getElementById("contenedorTablaSanciones").hasChildNodes()){
		document.getElementById("contenedorTablaSanciones").removeChild(document.getElementById("table"));
	}

	var tabla=document.createElement('table');
	tabla.setAttribute("id", "table");

	for(var i in ArrayAmoSan){
		tr=document.createElement('tr');

	td=document.createElement('td');
	td.innerHTML=V_dni;
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	td.innerHTML=ArrayAmoSan[i].Nombre;
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	td.innerHTML=ArrayAmoSan[i].NombreAsig;
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	td.innerHTML="Pepe";
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	td.innerHTML=ArrayAmoSan[i].descripcion;
	td.setAttribute("class", "celda");
	tr.appendChild(td);

	td=document.createElement('td');
	boton=document.createElement('input');
	boton.setAttribute("type","radio");
	boton.setAttribute("id",i);
	boton.setAttribute("name","RBFirma");
	boton.setAttribute("value",ArrayAmoSan[i].CodAmonestacion);
	boton.setAttribute("onclick","aplicarFechaSan('"+ArrayAmoSan[i].Fecha_Amonestacion+"'), recogerCod(this.value), recogerDNI('"+V_dni+"')");
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

	document.getElementById("contenedorTablaSanciones").appendChild(tabla);
	document.getElementById("tablaDeSanciones").style.display="block";
}