<?php

session_start();

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$datosLogin=json_decode($_REQUEST["datos"],true);

$result=mysqli_query($conexion, "select * from profesores where CodProfesor='".$datosLogin["usuario"]."' and Password='".$datosLogin["password"]."'") or die("Error en el login.");

$i=0;

while($fila=mysqli_fetch_array($result)){
	$resultLogin[$i]=$fila;
	$i++;
}

if(isset($resultLogin)){
	$_SESSION["USUARIO"]=$datosLogin["usuario"];
	$_SESSION["NOMBRE"]=$resultLogin[0]["Nombre"]." ".$resultLogin[0]["Apellidos"];
	$_SESSION["PERMISO"]=$resultLogin[0]["Permisos"];
	echo json_encode($resultLogin);
}
else{
	echo "Sin resultado";
}

mysqli_close($conexion);