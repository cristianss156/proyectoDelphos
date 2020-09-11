var objAjax;

function crearAjax(){
	if(window.XMLHttpRequest){
		objAjax=new XMLHttpRequest();
	}
	else{
		objAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
}

//funcion que recoge los datos del usuario que ha hecho login de la sesion
function compruebaSesion(){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/verSesion.php", true);
	objAjax.send();
	objAjax.onreadystatechange=recibirDatosLogin;
}

//funcion que recoge el usuario y la contraseña de quien hace login y realiza la comprobacion
function login(_user, _pwd){
	crearAjax();

	var datos={
		usuario:_user,
		password:_pwd
	};

	var jsonstring=JSON.stringify(datos);
	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/login.php?datos="+jsonstring, true);
	objAjax.send();
	objAjax.onreadystatechange=recibirResultadoLogin;
}

//funcion que cierra la sesion del usuario actual
function salir(){
	crearAjax();

	objAjax.open("GET","http://localhost/html/proyectoDelphos/php/cerrarSesion.php", true);
	objAjax.send();

	document.getElementById("contenido").style.display="none";
	document.getElementById("usuario").value="";
	document.getElementById("pwd").value="";
	document.getElementById("formLogin").style.display="block";

}

//funcion que comprueba que si hay algun usuario logeado al recagar la pagina
function recibirDatosLogin(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		if(objAjax.responseText=="Sin datos"){
			document.getElementById("formLogin").style.display="block";
		}
		else{
			var profesor=[];
			profesor=JSON.parse(objAjax.responseText);
			document.getElementById("saludoNombre").innerHTML=profesor[1];
			document.getElementById("contenido").style.display="block";
			if(profesor[2]==="Profesor"){
				document.getElementById("listadosEnlace").style.display="none";
			}
			else{
				document.getElementById("listadosEnlace").style.display="block";
			}
		}
	}
}

//funcion que comprueba que si el login es correcto
function recibirResultadoLogin(){
	if(objAjax.readyState === 4 && objAjax.status === 200){
		if(objAjax.responseText==="Sin resultado"){
			document.getElementById("mensaje").innerHTML="";
			document.getElementById("mensaje").innerHTML="Datos de inicio de sesión erroneos";
			document.getElementById("mensaje_info").style.display="block";
		}
		else{
			var profesor=[];
			profesor=JSON.parse(objAjax.responseText);
			document.getElementById("formLogin").style.display="none";
			document.getElementById("saludoNombre").innerHTML=profesor[0]["Nombre"]+" "+profesor[0]["Apellidos"];
			document.getElementById("contenido").style.display="block";
			if(profesor[0]["Permisos"]==="Profesor"){
				document.getElementById("listadosEnlace").style.display="none";
			}
			else{
				document.getElementById("listadosEnlace").style.display="block";
			}
		}
	}
}