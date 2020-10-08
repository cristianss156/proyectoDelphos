<?php

	require_once('conexionBD.php');

	$result = $conexion->prepare("SELECT p.nombre AS NOMBRE, p.apellidos AS APELLIDOS, COUNT(*) AS TOTAL FROM amonestaciones a, profesores p WHERE p.CodProfesor=a.CodProfesor GROUP BY p.nombre;");
	$result->execute();

	if(count($result) !== 0) {
		while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
			$totalAMO[] = array_map('utf8_encode', $fila);
		}
		echo json_encode($totalAMO);
	} else { echo 0; }

?>