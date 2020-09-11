var objAjax;

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

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/cerrarSesion.php", true);
	objAjax.send();

	location.href = "index.html";
}

//funcion que recoge los datos del usuario que ha hecho login de la sesion
function compruebaSesion(){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/verSesion.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirDatosLogin;
}

//funcion que rellena el select de profesores con los profesores
function rellenarProf(){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/buscarProf.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirPorf;
}

//funcion que se encarga de rellenar el select con los cursos
function rellenarCursos(){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/listarCursos.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirCursos;
}

//funcion que recoge el dni de un alumno y lo utiliza para buscar sus amonestaciones y expulsiones
function buscarAmoExp(dni){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/buscarAmoExpAlumn.php?dni="+dni, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirAmoExpAlumn;
}

//funcion que busca a todos los alumnos con amonestaciones y/o expulsiones sin firmar
function alumnosSinFirma(){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/buscarAlumnosSinFirma.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirAlumnoSinFirma;
}

//funcion que recoge el codigo de un profesor y lo utiliza para buscar las amonestaciones de ese profesor
function amoProfesor(prof){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/buscarAmoProf.php?prof="+prof, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirAmoProf;
}


//funcion que recoge un curso y busca las expulsiones y amonestaciones de los alumnos de ese grupo
function amoExpGrp(grupo){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/buscarAmoExpGrp.php?grp="+grupo, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirAmoExpGrp;
}

//funcion que busca las amonestaciones totales de cada profesor
function profesoresAmoTotal(){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/buscarAmoTotal.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirAmoTotales;
}

//funcion que recibe los datos de la sesion y comprueba si hay algun usuario registrado
//si no hay ningun usuario se redirecciona a index.html
function recibirDatosLogin(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
			var profesor=[];
			
			if(objAjax.responseText==="Sin datos"){
				location.href = "index.html";
			}
			else{ 
				rellenarProf();
			}
	}
}

//funcion que comprueba la respuesta del servidor al consultar los profesores
function recibirPorf(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var profesores=[];
		profesores=JSON.parse(objAjax.responseText);
		formatearProfs(profesores);
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

//funcion que comprueba la respuesta del servidor al consultar las amonestaciones y expulsiones de un alumno
function recibirAmoExpAlumn(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var AmoExpAlumn=[];

		AmoExpAlumn=JSON.parse(objAjax.responseText);
		if(AmoExpAlumn[0]!==null || AmoExpAlumn[1]!==null){
			formatearAmoExp(AmoExpAlumn);
		}
		else{
			if(document.getElementById("Listas").hasChildNodes()){
				document.getElementById("Listas").removeChild(document.getElementById("table"));
			}
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="No se han encontrado datos que coincidan con tu busqueda";
			document.getElementById("mensaje_info").style.display="block";
		}
	}
}

//funcion que comprueba la respuesta del servidor al consultar los alumnos con amonestaciones y/o expulsiones sin firma
function recibirAlumnoSinFirma(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var alumn=[];

		alumn=JSON.parse(objAjax.responseText);
		if(alumn[0]!==null || alumn[1]!==null){
			formatearBusqueda(alumn);
		}
		else{
			if(document.getElementById("Listas").hasChildNodes()){
				document.getElementById("Listas").removeChild(document.getElementById("table"));
			}
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="No se han encontrado datos que coincidan con tu busqueda";
			document.getElementById("mensaje_info").style.display="block";
		}
	}
}

//funcion que comprueba la respuesta del servidor al consultar las amonestaciones de un profesor
function recibirAmoProf(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var total=[];
		
		if(objAjax.responseText==="null"){
			if(document.getElementById("Listas").hasChildNodes()){
				document.getElementById("Listas").removeChild(document.getElementById("table"));
			}
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="No se han encontrado datos que coincidan con tu busqueda";
			document.getElementById("mensaje_info").style.display="block";
		}
		else{
			total=JSON.parse(objAjax.responseText);
			formatearBusquedaAmoProf(total);
		}
	}
}

//funcion que comprueba la respuesta del servidor al consultar las amonestaciones y expulsiones de un grupo
function recibirAmoExpGrp(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var AmoExpGrp=[];

		AmoExpGrp=JSON.parse(objAjax.responseText);
		if(AmoExpGrp[0]!==null || AmoExpGrp[1]!==null){
			formatearBusquedaAmoExpGrp(AmoExpGrp);
		}
		else{
			if(document.getElementById("Listas").hasChildNodes()){
				document.getElementById("Listas").removeChild(document.getElementById("table"));
			}
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="No se han encontrado datos que coincidan con tu busqueda";
			document.getElementById("mensaje_info").style.display="block";
		}	
	}
}

//funcion que comprueba la respuesta del servidor al consultar las amonestaciones totales de cada profesor
function recibirAmoTotales(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		var total=[];
		
		if(objAjax.responseText==="null"){
			if(document.getElementById("Listas").hasChildNodes()){
				document.getElementById("Listas").removeChild(document.getElementById("table"));
			}
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="No se han encontrado datos que coincidan con tu busqueda";
			document.getElementById("mensaje_info").style.display="block";
		}
		else{
			total=JSON.parse(objAjax.responseText);
			formatearBusquedaTotal(total);
		}
	}
}

//funcion que formatea los datos de los profesores en el select correspondiente
function formatearProfs(ArrayProfs){
	var select=document.getElementById("codProf");

	while(select.hasChildNodes()){
		select.removeChild(select.firstChild);
	}

	select.appendChild(document.createElement("option"));

	for(var i in ArrayProfs){
		option=document.createElement("option");
		option.value=ArrayProfs[i].CodProfesor;
		option.innerHTML=ArrayProfs[i].Nombre+" "+ArrayProfs[i].Apellidos;

		select.appendChild(option);
	}

	rellenarCursos();
}

//funcion que formatea los datos de los cursos en el select correspondiente
function formatearCursos(ArrayCursos){
	var select=document.getElementById('codGrp');

	for(var i in ArrayCursos){
		option=document.createElement("option");
		option.value=ArrayCursos[i].CodCurso;
		option.innerHTML=ArrayCursos[i].CodCurso;

		select.appendChild(option);
	}
}

//funcion que formatea los datos de las amonestaciones y expulsiones de un alumno
function formatearAmoExp(ArrayAmoExpalumn){
	if(document.getElementById("Listas").hasChildNodes()){
		document.getElementById("Listas").removeChild(document.getElementById("table"));
	}


	var tabla=document.createElement('div');
	tabla.setAttribute("id", "table");

	if(ArrayAmoExpalumn[0]!==null){
		amo=document.createElement('div');
		amo.setAttribute('class','tituloListas');
		spanamo=document.createElement('span');
		spanamo.innerHTML="Amonestaciones de "+ArrayAmoExpalumn[0][0]["NOMBRE"]+" "+ArrayAmoExpalumn[0][0]["APELLIDOS"];
		amo.appendChild(spanamo);

		tabla.appendChild(amo);

		for(var i in ArrayAmoExpalumn[0]){
			div=document.createElement('div');
			div.setAttribute('class','itemLista');
			divImg=document.createElement('div');
			divImg.setAttribute('class','person');
			img=document.createElement('img');
			img.setAttribute('src','imagenes/warning.png');
			divImg.appendChild(img);
			span=document.createElement('span');
			span.setAttribute('class','span');
			span.innerHTML="<b>Causa:</b> "+ArrayAmoExpalumn[0][i]["CAUSA"]+" <br><b>Fecha:</b> "+ArrayAmoExpalumn[0][i]["FECHA"];
		
			div.appendChild(divImg);
			div.appendChild(span);

			tabla.appendChild(div);
		}
	}

	if(ArrayAmoExpalumn[1]!==null){
		exp=document.createElement('div');
		exp.setAttribute('class','tituloListas');
		spanexp=document.createElement('span');
		spanexp.innerHTML="Expulsiones de "+ArrayAmoExpalumn[1][0]["NOMBRE"]+" "+ArrayAmoExpalumn[1][0]["APELLIDOS"];
		exp.appendChild(spanexp);

		tabla.appendChild(exp);
	
		for(var i in ArrayAmoExpalumn[1]){
			div=document.createElement('div');
			div.setAttribute('class','itemLista');
			divImg=document.createElement('div');
			divImg.setAttribute('class','person');
			img=document.createElement('img');
			img.setAttribute('src','imagenes/error.png');
			divImg.appendChild(img);
			span=document.createElement('span');
			span.setAttribute('class','span');
			span.innerHTML="<b>Causa:</b> "+ArrayAmoExpalumn[1][i]["CAUSA"]+" <br><b>Fecha:</b> "+ArrayAmoExpalumn[1][i]["FECHA"];

			div.appendChild(divImg);
			div.appendChild(span);

			tabla.appendChild(div);
		}
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display="block";
}

//funcion que formatea los datos de las amonestaciones y expulsiones sin firma de todos los alumnos
function formatearBusqueda(ArrayAlumn){
	if(document.getElementById("Listas").hasChildNodes()){
		document.getElementById("Listas").removeChild(document.getElementById("table"));
	}

	var tabla=document.createElement('div');
	tabla.setAttribute("id", "table");

	if(ArrayAlumn[0]!==null){
		amo=document.createElement('div');
		amo.setAttribute('class','tituloListas');
		spanamo=document.createElement('span');
		spanamo.innerHTML="Amonestaciones";
		amo.appendChild(spanamo);

		tabla.appendChild(amo);

		for(var i in ArrayAlumn[0]){
			div=document.createElement('div');
			div.setAttribute('class','itemLista');
			divImg=document.createElement('div');
			divImg.setAttribute('class','person');
			img=document.createElement('img');
			img.setAttribute('src','imagenes/person.png');
			divImg.appendChild(img);
			span=document.createElement('span');
			span.setAttribute('class','span');
			span.innerHTML="<b>DNI:</b> "+ArrayAlumn[0][i]["AMO_DNI"]+" <br><b>Nombre:</b> "+ArrayAlumn[0][i]["AMO_NOMBRE"]+" "+ArrayAlumn[0][i]["AMO_APELLIDOS"]+" <br><b>Curso:</b> "+ArrayAlumn[0][i]["AMO_CURSO"]+" <b>Cantidad:</b> "+ArrayAlumn[0][i]["CUENTA"];
		
			div.appendChild(divImg);
			div.appendChild(span);

			tabla.appendChild(div);
		}
	}

	if(ArrayAlumn[1]!==null){
		exp=document.createElement('div');
		exp.setAttribute('class','tituloListas');
		spanexp=document.createElement('span');
		spanexp.innerHTML="Expulsiones";
		exp.appendChild(spanexp);

		tabla.appendChild(exp);
	
		for(var i in ArrayAlumn[1]){
			div=document.createElement('div');
			div.setAttribute('class','itemLista');
			divImg=document.createElement('div');
			divImg.setAttribute('class','person');
			img=document.createElement('img');
			img.setAttribute('src','imagenes/person.png');
			divImg.appendChild(img);
			span=document.createElement('span');
			span.setAttribute('class','span');
			span.innerHTML="<b>DNI:</b> "+ArrayAlumn[1][i]["EXP_DNI"]+" <br><b>Nombre:</b> "+ArrayAlumn[1][i]["EXP_NOMBRE"]+" "+ArrayAlumn[1][i]["EXP_APELLIDOS"]+" <br><b>Curso:</b> "+ArrayAlumn[1][i]["EXP_CURSO"]+" <b>Cantidad:</b> "+ArrayAlumn[1][i]["CUENTA"];

			div.appendChild(divImg);
			div.appendChild(span);

			tabla.appendChild(div);
		}
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display="block";
}

//funcion que formatea los datos de las amonestaciones de un profesor
function formatearBusquedaAmoProf(ArrayAmoProf){
	if(document.getElementById("Listas").hasChildNodes()){
		document.getElementById("Listas").removeChild(document.getElementById("table"));
	}

	var tabla=document.createElement('div');
	tabla.setAttribute("id", "table");

	prof=document.createElement('div');
	prof.setAttribute('class','tituloListas');
	spanprof=document.createElement('span');
	spanprof.innerHTML="Amonestaciones";
	prof.appendChild(spanprof);

	tabla.appendChild(prof);

	for(var i in ArrayAmoProf[0]){
		div=document.createElement('div');
		div.setAttribute('class','itemLista');
		divImg=document.createElement('div');
		divImg.setAttribute('class','person');
		img=document.createElement('img');
		img.setAttribute('src','imagenes/warning.png');
		divImg.appendChild(img);
		span=document.createElement('span');
		span.setAttribute('class','span');
		span.innerHTML="<b>DNI:</b> "+ArrayAmoProf[0][i]["DNI"]+" <b>Nombre:</b> "+ArrayAmoProf[0][i]["NOMBRE"]+" "+ArrayAmoProf[0][i]["APELLIDOS"]+" <br><b>Causa:</b> "+ArrayAmoProf[0][i]["CAUSA"]+" <b>Fecha:</b> "+ArrayAmoProf[0][i]["FECHA"];
		
		div.appendChild(divImg);
		div.appendChild(span);

		tabla.appendChild(div);
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display="block";
}

//funcion que formatea los datos de las amonestaciones y expulsiones de un grupo
function formatearBusquedaAmoExpGrp(ArrayAmoExpGrp){
	if(document.getElementById("Listas").hasChildNodes()){
		document.getElementById("Listas").removeChild(document.getElementById("table"));
	}

	var tabla=document.createElement('div');
	tabla.setAttribute("id", "table");

	if(ArrayAmoExpGrp[0]!==null){
		amo=document.createElement('div');
		amo.setAttribute('class','tituloListas');
		spanamo=document.createElement('span');
		spanamo.innerHTML="Amonestaciones de "+ArrayAmoExpGrp[0][0]["CURSO"];
		amo.appendChild(spanamo);

		tabla.appendChild(amo);

		for(var i in ArrayAmoExpGrp[0]){
			div=document.createElement('div');
			div.setAttribute('class','itemLista');
			divImg=document.createElement('div');
			divImg.setAttribute('class','person');
			img=document.createElement('img');
			img.setAttribute('src','imagenes/warning.png');
			divImg.appendChild(img);
			span=document.createElement('span');
			span.setAttribute('class','span');
			span.innerHTML="<b>DNI:</b> "+ArrayAmoExpGrp[0][i]["DNI"]+" <b>Nombre:</b> "+ArrayAmoExpGrp[0][i]["NOMBRE"]+" "+ArrayAmoExpGrp[0][i]["APELLIDOS"]+" <br><b>Cantidad:</b> "+ArrayAmoExpGrp[0][i]["CUENTA"];
		
			div.appendChild(divImg);
			div.appendChild(span);

			tabla.appendChild(div);
		}
	}

	if(ArrayAmoExpGrp[1]!==null){
		exp=document.createElement('div');
		exp.setAttribute('class','tituloListas');
		spanexp=document.createElement('span');
		spanexp.innerHTML="Expulsiones de "+ArrayAmoExpGrp[1][0]["CURSO"];
		exp.appendChild(spanexp);

		tabla.appendChild(exp);
	
		for(var i in ArrayAmoExpGrp[1]){
			div=document.createElement('div');
			div.setAttribute('class','itemLista');
			divImg=document.createElement('div');
			divImg.setAttribute('class','person');
			img=document.createElement('img');
			img.setAttribute('src','imagenes/error.png');
			divImg.appendChild(img);
			span=document.createElement('span');
			span.setAttribute('class','span');
			span.innerHTML="<b>DNI:</b> "+ArrayAmoExpGrp[1][i]["DNI"]+" <b>Nombre:</b> "+ArrayAmoExpGrp[1][i]["NOMBRE"]+" "+ArrayAmoExpGrp[1][i]["APELLIDOS"]+" <br><b>Cantidad:</b> "+ArrayAmoExpGrp[1][i]["CUENTA"];

			div.appendChild(divImg);
			div.appendChild(span);

			tabla.appendChild(div);
		}
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display="block";
}

//funcion que formatea los datos de las amonestaciones totales de cada profesor
function formatearBusquedaTotal(ArrayTotal){
	if(document.getElementById("Listas").hasChildNodes()){
		document.getElementById("Listas").removeChild(document.getElementById("table"));
	}

	var tabla=document.createElement('div');
	tabla.setAttribute("id", "table");

	prof=document.createElement('div');
	prof.setAttribute('class','tituloListas');
	spanprof=document.createElement('span');
	spanprof.innerHTML="Profesores";
	prof.appendChild(spanprof);

	tabla.appendChild(prof);

	for(var i in ArrayTotal[0]){
		div=document.createElement('div');
		div.setAttribute('class','itemLista');
		divImg=document.createElement('div');
		divImg.setAttribute('class','person');
		img=document.createElement('img');
		img.setAttribute('src','imagenes/person.png');
		divImg.appendChild(img);
		span=document.createElement('span');
		span.setAttribute('class','span');
		span.innerHTML="<b>Nombre:</b> "+ArrayTotal[0][i]["NOMBRE"]+" "+ArrayTotal[0][i]["APELLIDOS"]+" <br><b>Total de amonestaciones:</b> "+ArrayTotal[0][i]["TOTAL"];
		
		div.appendChild(divImg);
		div.appendChild(span);

		tabla.appendChild(div);
	}

	document.getElementById("Listas").appendChild(tabla);
	document.getElementById("contentPrint").style.display="block";
}