<?php

	require_once('conexionBD.php');

	$result = $conexion->prepare("SELECT * FROM causas_amonestacion");
	$result->execute();

	if(count($result) !== 0) {
		while($fila = $result->fetch(PDO::FETCH_ASSOC)){
			$vuelta[] = array_map('utf8_encode', $fila);
		}
		echo json_encode($vuelta);
	} else { echo 0; }

?>