<?php

	require_once('conexionBD.php');

	$alumnos = null;

	$result = $conexion->prepare("SELECT a.DNI AS AMO_DNI, a.Nombre AS AMO_NOMBRE, a.Apellidos AS AMO_APELLIDOS, a.CodCurso AS AMO_CURSO, COUNT(a.DNI) AS CUENTA FROM alumnos a, amonestaciones am WHERE am.IdAlumno=a.DNI AND Fecha_Firma IS NULL GROUP BY a.DNI");
	$result->execute();

	$aux = null;
	while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
		$aux[] = array_map('utf8_encode', $fila);
	}
	$alumnos[0] = $aux;

	$result = $conexion->prepare("SELECT a.DNI AS EXP_DNI, a.Nombre AS EXP_NOMBRE, a.Apellidos AS EXP_APELLIDOS, a.CodCurso AS EXP_CURSO, COUNT(a.DNI) AS CUENTA FROM alumnos a, expulsiones e WHERE e.IdAlumno=a.DNI AND e.Fecha_Firma IS NULL GROUP BY a.DNI");
	$result->execute();

	$aux = null;
	while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
		$aux[] = array_map('utf8_encode', $fila);
	}
	$alumnos[1] = $aux;

	echo json_encode($alumnos);

?>