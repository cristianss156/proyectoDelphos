var objAjax;
var curso;

function crearAjax(){
	if(window.XMLHttpRequest){
		objAjax=new XMLHttpRequest();
	}
	else{
		objAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

//funcion que cierra la sesion del usuario actual
function salir(){
	crearAjax();

	objAjax.open("GET","http://localhost/proyectoDelphos/php/cerrarSesion.php", true);
	objAjax.send();

	location.href = "index.html";
}

//funcion que recoge los datos del usuario que ha hecho login de la sesion
function compruebaSesionGeneral(){
	crearAjax();

	objAjax.open("GET","http://localhost/proyectoDelphos/php/verSesion.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirDatosLoginGeneral;
}

//funcion que se encarga de rellenar el select con los cursos
function rellenarCursos(){
	crearAjax();
	objAjax.open("GET","http://localhost/proyectoDelphos/php/listarCursos.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirCursos;
}

//funcion que se encarga de rellenar el select con los alumnos en funcion del curso que recibe como parametro
function rellenarAlumnos(_curso){
	curso=_curso;
	crearAjax();
	objAjax.open("GET","http://localhost/proyectoDelphos/php/listarAlumnos.php?curso="+_curso, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirAlumnos;
}

//funcion que se encarga de rellenar el select con las asignaturas en funcion del curso que recibe como parametro
function rellenarAsignaturas(_curso){
	crearAjax();
	objAjax.open("GET","http://localhost/proyectoDelphos/php/listarAsignaturas.php?curso="+_curso, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirAsignaturas;
}

//funcion que se encarga de rellenar el select con las causas de amonestacion
function rellenarCausasAmonestacion(){
	crearAjax();
	objAjax.open("GET","http://localhost/proyectoDelphos/php/listarCausasAmonestacion.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirCausasAmonestacion;
}

//funcion que se encarga de guardar en la base de datos una nueva causa de amonestacion
function crearCausaAmonestacion(nuevaCausaAmo){
	if(nuevaCausaAmo===""){
		document.getElementById("mensaje").innerHTML="";
		document.getElementById("mensaje").innerHTML="Introduce una nueva causa de amonestación";
		document.getElementById("mensaje_info").style.display="block";
	}
	else{
		crearAjax();
		objAjax.open("GET","http://localhost/proyectoDelphos/php/crearCausaAmonestacion.php?causa="+nuevaCausaAmo, true);
		objAjax.send();
		objAjax.onreadystatechange=recibirNuevaAmonestacion;
	}
}

//funcion que comprueba que si hay algun usuario logeado al recagar la pagina
function recibirDatosLoginGeneral(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
			var profesor=[];
			
			if(objAjax.responseText==="Sin datos"){
				location.href = "index.html";
			}
			else{ 
				profesor=JSON.parse(objAjax.responseText);
				if(profesor[2]==="Profesor"){
					document.getElementById("expulsarSancion").style.display="none";
					document.getElementById("listadosEnlace").style.display="none";
					document.getElementById("sanciones").removeAttribute("onclick");
					document.getElementById("firmas").removeAttribute("onclick");
				}
				else{
					document.getElementById("listadosEnlace").style.display="block";
				}
			}
		rellenarCursos();
	}
}

//funcion que comprueba la respuesta del servidor al consultar los cursos
function recibirCursos(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var datosCursos=[];
		datosCursos=JSON.parse(objAjax.responseText);
		formatearCursos(datosCursos);
	}
}

//funcion que comprueba la respuesta del servidor al consultar los alumnos
function recibirAlumnos(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var datosAlumnos=[];
		datosAlumnos=JSON.parse(objAjax.responseText);
		formatearAlumnos(datosAlumnos);
	}
}

//funcion que comprueba la respuesta del servidor al consultar las asignaturas
function recibirAsignaturas(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var datosAsignaturas=[];
		datosAsignaturas=JSON.parse(objAjax.responseText);
		formatearAsignaturas(datosAsignaturas);
	}
}

//funcion que comprueba la respuesta del servidor al consultar las causas de amonestacion
function recibirCausasAmonestacion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var datosAmonestaciones=[];
		datosAmonestaciones=JSON.parse(objAjax.responseText);
		formatearCausasAmonestacion(datosAmonestaciones);
	}
}

//funcion que comprueba la respuesta del servidor al crear una nueva causa de amonestacion
function recibirNuevaAmonestacion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		document.getElementById("mensaje").innerHTML="";
		document.getElementById("mensaje").innerHTML="Vuelve a habilitar las causas para elegir la nueva causa";
		document.getElementById("mensaje_info").style.display="block";
		document.getElementById("nueva_Amonestacion").value="";
		rellenarCausasAmonestacion();
	}	
}

//funcion que formatea los datos de los cursos en el select correspondiente
function formatearCursos(ArrayCursos){
	var select=document.getElementById('Curso');

	for(var i in ArrayCursos){
		option=document.createElement("option");
		option.value=ArrayCursos[i].CodCurso;
		option.innerHTML=ArrayCursos[i].CodCurso;

		select.appendChild(option);
	}
	rellenarCausasAmonestacion();
}

//funcion que formatea los datos de los alumnos en el select correspondiente
function formatearAlumnos(ArrayAlumnos){
	var select=document.getElementById("alumno");

	while(select.hasChildNodes()){
		select.removeChild(select.firstChild);
	}

	select.appendChild(document.createElement("option"));

	for(var i in ArrayAlumnos){
		option=document.createElement("option");
		option.value=ArrayAlumnos[i].DNI;
		option.innerHTML=ArrayAlumnos[i].Nombre+" "+ArrayAlumnos[i].Apellidos;

		select.appendChild(option);
	}
	rellenarAsignaturas(curso);
}

//funcion que formatea los datos de las asignaturas en el select correspondiente
function formatearAsignaturas(ArrayAsignaturas){
	var select=document.getElementById("asignatura");

	while(select.hasChildNodes()){
		select.removeChild(select.firstChild);
	}

	select.appendChild(document.createElement("option"));

	for(var i in ArrayAsignaturas){
		option=document.createElement("option");
		option.value=ArrayAsignaturas[i].CodAsignatura;
		option.innerHTML=ArrayAsignaturas[i].NombreAsig;

		select.appendChild(option);
	}
}

//funcion que formatea los datos de las causas de amonestacion en el select correspondiente
function formatearCausasAmonestacion(ArrayAmonestaciones){
	var select=document.getElementById("causa_amo");

	while(select.hasChildNodes()){
		select.removeChild(select.firstChild);
	}

	select.appendChild(document.createElement("option"));

	for(var i in ArrayAmonestaciones){
		option=document.createElement("option");
		option.value=ArrayAmonestaciones[i].CodCausa_Amonestacion;
		option.innerHTML=ArrayAmonestaciones[i].descripcion;

		select.appendChild(option);
	}
}