<?php

	require_once('conexionBD.php');

	$result = $conexion("SELECT * FROM causa_expulsion");
	$result->execute();

	if(count($result) !== 0) {
		while($fila = $result->fetch(PDO::FETCH_ASSOC)){
			$vuelta[] = array_map('utf8_encode', $fila);
		}
		echo json_encode($vuelta);
	} else { echo 0; }

?>