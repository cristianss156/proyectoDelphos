var objAjax;
var usuario;
var _cod;
var _tipo;
var v_dni;

function crearAjax(){
	if(window.XMLHttpRequest){
		objAjax=new XMLHttpRequest();
	}
	else{
		objAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

//funcion que recoge de sesion los datos del usuario que en ese momento esta logeado
function compruebaSesion(){
	crearAjax();

	objAjax.open("GET","http://localhost/proyectoDelphos/php/verSesion.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirDatosLogin;
}

//funcion que recoge el codigo de la expulsion o amonestacion sobre la que se va a trabajar
function recogerCod(_codigo){
	_cod=_codigo;
}

//funcion que recoge si hay que firmar una amonestacion o una expulsion
function recogerTipo(_tipoFirma){
	_tipo=_tipoFirma;
}

//funcion que recoge el dni del alumno para utilizarlo en las distintas funciones
function recogerDNI(_dni){
	v_dni=_dni;
}

//funcion que recibe los datos que se necesitan para grabar una amonestacion
function amonestar(_curso, _alumno, _fecha, _hora, _asignatura, _causa){
	crearAjax();

	var datosAmonestacion={
		curso:_curso,
		profesor:usuario,
		alumno:_alumno,
		fecha:_fecha,
		hora:_hora,
		asignatura:_asignatura,
		causa:_causa
	};

	var jsonstring=JSON.stringify(datosAmonestacion);
	objAjax.open("GET","http://localhost/proyectoDelphos/php/amonestar.php?datosAmonestacion="+jsonstring, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirResultadoAmonestacion;
}

//funcion que recibe los datos que se necesitan para grabar una expulsion
function expulsar(_curso, _alumno, _fecha, _hora, _asignatura, _causa){
	crearAjax();

	var datosExpulsion={
		curso:_curso,
		profesor:usuario,
		alumno:_alumno,
		fecha:_fecha,
		hora:_hora,
		asignatura:_asignatura,
		causa:_causa,
		tipo:"normal"
	};

	var jsonstring=JSON.stringify(datosExpulsion);
	objAjax.open("GET","http://localhost/proyectoDelphos/php/expulsar.php?datosExpulsion="+jsonstring, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirResultadoExpulsion;
}

//funcion que recibe los datos que se necesitan para grabar una expulsion directa con sancion
function expulsarSancion(_curso, _alumno, _fecha, _hora, _asignatura, _causa){
	crearAjax();

	var datosExpulsion={
		curso:_curso,
		profesor:usuario,
		alumno:_alumno,
		fecha:_fecha,
		hora:_hora,
		asignatura:_asignatura,
		causa:_causa,
		tipo:"SancionDirecta"
	};

	var jsonstring=JSON.stringify(datosExpulsion);
	objAjax.open("GET","http://localhost/proyectoDelphos/php/expulsar.php?datosExpulsion="+jsonstring, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirResultadoExpulsion;
}

//funcion que recibe los datos que se necesitan para grabar la firma de una expulsion o una amonestacion
function firmar(_fecha){
	crearAjax();

	var datosFirma={
		codigo:_cod,
		fecha:_fecha,
		tipo:_tipo
	};

	var jsonstring=JSON.stringify(datosFirma);
	objAjax.open("GET","http://localhost/proyectoDelphos/php/firmar.php?datosFirma="+jsonstring, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirResultadoFirma;
}

//funcion que recibe los datos que se necesitan para grabar una sancion
function sancionar(_fecha, _sancion){
	crearAjax();

	var datosSancion={
		codigo:_cod,
		profesor:usuario,
		fecha:_fecha,
		alumno:v_dni,
		sancion:_sancion
	};

	var jsonstring=JSON.stringify(datosSancion);
	objAjax.open("GET","http://localhost/proyectoDelphos/php/sancionar.php?datosSancion="+jsonstring, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirResultadoSancion;
}

//funcion llamada por "compruebaSesion()" que recoge los datos del servidor y guarda en la variable global "usuario"
//el codigo del usuario para poder usarlo en el resto de funciones
function recibirDatosLogin(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var profesor=[];
		profesor=JSON.parse(objAjax.responseText);
		usuario=profesor[0];
	}
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras amonestar
function recibirResultadoAmonestacion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		if(objAjax.responseText==="Error al insertar."){
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="Error al registrar la amonestación";
			document.getElementById("mensaje_info").style.display="block";
		}
		else{
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="Amonestación guardada";
			document.getElementById("mensaje_info").style.display="block";
		}
	}	
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras expulsar
function recibirResultadoExpulsion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		if(objAjax.responseText==="Error al insertar."){
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="Error al registrar la expulsión";
			document.getElementById("mensaje_info").style.display="block";
		}
		else{
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="Expulsión guardada";
			document.getElementById("mensaje_info").style.display="block";
		}
	}	
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras firmar
function recibirResultadoFirma(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		if(objAjax.responseText==="0"){
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="Error al registrar la firma";
			document.getElementById("mensaje_info").style.display="block";
		}
		else{
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="Firma guardada";
			document.getElementById("mensaje_info").style.display="block";
			
			if(document.getElementById("contenedorTabla").hasChildNodes()){
				document.getElementById("contenedorTabla").removeChild(document.getElementById("table"));
			}
		}
	}
}

//funcion que comprueba la respuesta del servidor y muestra un mensaje de informacion tras sancionar
function recibirResultadoSancion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		if(objAjax.responseText==="0"){
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="Error al registrar la sanción";
			document.getElementById("mensaje_info").style.display="block";
		}
		else{
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="Sanción guardada";
			document.getElementById("mensaje_info").style.display="block";
			
			if(document.getElementById("contenedorTablaSanciones").hasChildNodes()){
				document.getElementById("contenedorTablaSanciones").removeChild(document.getElementById("table"));
			}
			document.getElementById("tablaDeSanciones").style.display="none";
		}
	}
}