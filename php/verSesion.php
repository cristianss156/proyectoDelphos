<?php

session_start();

if(isset($_SESSION["USUARIO"])){
	$datosLogin[0]=$_SESSION["USUARIO"];
	$datosLogin[1]=$_SESSION["NOMBRE"];
	$datosLogin[2]=$_SESSION["PERMISO"];

	echo json_encode($datosLogin);
}
else{
	echo "Sin datos";
}