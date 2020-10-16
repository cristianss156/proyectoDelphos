<?php

	require_once('conexionBD.php');

	$nuevaAmo = $_REQUEST["causa"];

	$result = $conexion->prepare("INSERT INTO causas_amonestacion (descripcion) VALUES (:_NEW);");
	$result->bindvalue(':_NEW', $nuevaAmo, PDO::PARAM_STR);
	$result->execute();

	if($result->rowCount() == 0) { echo 0; }
	else { echo 1; }

?>