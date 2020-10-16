<?php

	require_once('conexionBD.php');

	$curso = $_REQUEST["curso"];

	$result = $conexion->prepare("SELECT * FROM alumnos WHERE codcurso=:_CURS");
	$result->bindvalue(':_CURS', $curso, PDO::PARAM_STR);
	$result->execute();

	if(count($result) !== 0) {
		while($fila = $result->fetch(PDO::FETCH_ASSOC)){
			$alumnos[] = array_map('utf8_encode', $fila);
		}
		echo json_encode($alumnos);
	} else { echo 0; }

?>