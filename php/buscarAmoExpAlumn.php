<?php

	require_once('conexionBD.php');

	$_dni = $_REQUEST["dni"];
	$alumnos = null;

	$result = $conexion->prepare($"SELECT al.nombre AS NOMBRE, al.apellidos AS APELLIDOS, ca.descripcion AS CAUSA, a.Fecha_Amonestacion AS FECHA FROM alumnos al, amonestaciones a, causas_amonestacion ca WHERE al.DNI=:_DNI AND a.IdAlumno=:_DNI AND a.CausaAmonestacion=ca.CodCausa_Amonestacion;");
	$result->bindValue(':_DNI', $_dni, PDO::PARAM_STR);
	$result->execute();

	$aux = null;
	while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
		$aux[] = array_map('utf8_encode', $fila);
	}
	$alumnos[0] = $aux;

	$result = $conexion->prepare("SELECT al.nombre AS NOMBRE, al.apellidos AS APELLIDOS, ce.descripcion AS CAUSA, e.Fecha_Expulsion AS FECHA FROM alumnos al, expulsiones e, causa_expulsion ce WHERE al.DNI=:_DNI AND e.IdAlumno=:_DNI AND e.CausaExpulsion=ce.CodCausa_Expulsion;");
	$result->bindValue(':_DNI', $_dni, PDO::PARAM_STR);
	$result->execute();

	$aux = null;
	while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
		$aux[] = array_map('utf8_encode', $fila);
	}
	$alumnos[1] = $aux;

	echo json_encode($alumnos);

?>