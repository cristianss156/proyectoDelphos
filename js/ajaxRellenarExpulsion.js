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

//funcion que se encarga de rellenar el select con los cursos
function rellenarCursosExpulsion(){
	crearAjax();
	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/listarCursos.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirCursosExpulsion;
}

//funcion que se encarga de rellenar el select con los alumnos en funcion del curso que recibe como parametro
function rellenarAlumnosExpulsion(_curso){
	curso=_curso;
	crearAjax();
	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/listarAlumnos.php?curso="+_curso, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirAlumnosExpulsion;
}

//funcion que se encarga de rellenar el select con las asignaturas en funcion del curso que recibe como parametro
function rellenarAsignaturasExpulsion(_curso){
	crearAjax();
	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/listarAsignaturas.php?curso="+_curso, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirAsignaturasExpulsion;
}

//funcion que se encarga de rellenar el select con las causas de expulsion
function rellenarCausasExpulsion(){
	crearAjax();
	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/listarCausasExpulsion.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirCausasExpulsion;
}

//funcion que se encarga de guardar en la base de datos una nueva causa de expulsion
function crearCausaExpulsion(nuevaCausaExp){
	if(nuevaCausaExp===""){
		document.getElementById("mensaje").innerHTML="";
		document.getElementById("mensaje").innerHTML="Introduce una nueva causa de expulsión";
		document.getElementById("mensaje_info").style.display="block";
	}
	else{
		crearAjax();
		objAjax.open("GET","http://localhost/html/proyectoDelphos/php/crearCausaExpulsion.php?causa="+nuevaCausaExp, true);
		objAjax.send();
		objAjax.onreadystatechange=recibirNuevaExpulsion;
	}
}

//funcion que comprueba la respuesta del servidor al consultar los cursos
function recibirCursosExpulsion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var datosCursos=[];
		datosCursos=JSON.parse(objAjax.responseText);
		formatearCursosExpulsion(datosCursos);
	}
}

//funcion que comprueba la respuesta del servidor al consultar los alumnos
function recibirAlumnosExpulsion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var datosAlumnos=[];
		datosAlumnos=JSON.parse(objAjax.responseText);
		formatearAlumnosExpulsion(datosAlumnos);
	}
}

//funcion que comprueba la respuesta del servidor al consultar las asignaturas
function recibirAsignaturasExpulsion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var datosAsignaturas=[];
		datosAsignaturas=JSON.parse(objAjax.responseText);
		formatearAsignaturasExpulsion(datosAsignaturas);
	}
}

//funcion que comprueba la respuesta del servidor al consultar las causas de expulsion
function recibirCausasExpulsion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var datosExpulsion=[];
		datosExpulsion=JSON.parse(objAjax.responseText);
		formatearCausasExpulsion(datosExpulsion);
	}
}

//funcion que comprueba la respuesta del servidor al crear una nueva causa de expulsion
function recibirNuevaExpulsion(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		document.getElementById("mensaje").innerHTML="";
		document.getElementById("mensaje").innerHTML="Vuelve a habilitar las causas para elegir la nueva causa";
		document.getElementById("mensaje_info").style.display="block";
		document.getElementById("nueva_Expulsion").value="";
		rellenarCausasExpulsion();
	}	
}

//funcion que formatea los datos de los cursos en el select correspondiente
function formatearCursosExpulsion(ArrayCursos){
	var select=document.getElementById('Curso_Exp');

	while(select.hasChildNodes()){
		select.removeChild(select.firstChild);
	}

	option=document.createElement("option");
	select.appendChild(option);

	for(var i in ArrayCursos){
		option=document.createElement("option");
		option.value=ArrayCursos[i].CodCurso;
		option.innerHTML=ArrayCursos[i].CodCurso;

		select.appendChild(option);
	}
	rellenarCausasExpulsion();
}

//funcion que formatea los datos de los alumnos en el select correspondiente
function formatearAlumnosExpulsion(ArrayAlumnos){
	var select=document.getElementById("alumno_Exp");

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
	rellenarAsignaturasExpulsion(curso);
}

//funcion que formatea los datos de las asignaturas en el select correspondiente
function formatearAsignaturasExpulsion(ArrayAsignaturas){
	var select=document.getElementById("asignatura_exp");

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
function formatearCausasExpulsion(ArrayExpulsiones){
	var select=document.getElementById("causa_exp");

	while(select.hasChildNodes()){
		select.removeChild(select.firstChild);
	}

	select.appendChild(document.createElement("option"));

	for(var i in ArrayExpulsiones){
		option=document.createElement("option");
		option.value=ArrayExpulsiones[i].CodCausa_Expulsion;
		option.innerHTML=ArrayExpulsiones[i].descripcion;

		select.appendChild(option);
	}
}