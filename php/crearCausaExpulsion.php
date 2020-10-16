<?php

	require_once('conexionBD.php');

	$nuevaExp = $_REQUEST["causa"];

	$result = $conexion->prepare("INSERT INTO causa_expulsion (descripcion) VALUES (:_NEW);");
	$result->bindvalue(':_NEW', $nuevaExp, PDO::PARAM_STR);
	$result->execeute();

	if($result->rowCount() == 0) { echo 0; }
	else { echo 1; }

?>