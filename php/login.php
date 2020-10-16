<?php

	session_start();

	require_once('conexionBD.php');

	$datosLogin = json_decode($_REQUEST["datos"],true);

	$result = $conexion->prepare("SELECT * FROM profesores WHERE CodProfesor=:_USER AND Password=:_PASS");
	$result->bindvalue(':_USER', $datosLogin["usuario"], PDO::PARAM_STR);
	$result->bindvalue(':_PASS', $datosLogin["password"], PDO::PARAM_STR);
	$result->execute();

	if(count($result) !== 0) {
		while($fila = $result->fetch(PDO::FETCH_ASSOC)){
			$resultLogin[] = array_map('utf8_encode', $fila);
		}
		$_SESSION["USUARIO"] = $datosLogin["usuario"];
		$_SESSION["NOMBRE"] = $resultLogin[0]["Nombre"]." ".$resultLogin[0]["Apellidos"];
		$_SESSION["PERMISO"] = $resultLogin[0]["Permisos"];
		echo json_encode($resultLogin);
	}	else { echo 0; }

?>