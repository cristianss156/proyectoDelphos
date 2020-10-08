<?php

	require_once('conexionBD.php');

	$_grupo = $_REQUEST["grp"];
	$alumnos = null;

	$result = $conexion->prepare("SELECT alu.dni AS DNI, alu.nombre AS NOMBRE, alu.apellidos AS APELLIDOS, alu.codCurso AS CURSO, count(*) AS CUENTA FROM alumnos alu, amonestaciones amo, causas_amonestacion ca WHERE amo.CodCurso=:_GRP AND alu.dni=amo.idalumno AND ca.codcausa_Amonestacion=amo.causaamonestacion GROUP BY alu.dni;");
	$result->bindValue(':_GRP', $_grupo, PDO::PARAM_STR);
	$result->execute();

	$aux = null;
	while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
		$alumnosAMO[] = array_map('utf8_encode', $fila);
	}
	$alumnos[0] = $aux;

	$result = $conexion->prepare("SELECT alu.dni AS DNI, alu.nombre AS NOMBRE, alu.apellidos AS APELLIDOS, alu.codCurso AS CURSO, count(*) AS CUENTA FROM alumnos alu, expulsiones exp, causa_expulsion ce WHERE exp.CodCurso=:_GRP AND alu.dni=exp.idalumno AND ce.codcausa_expulsion=exp.causaexpulsion GROUP BY alu.dni;");
	$result->bindValue(':_GRP', $_grupo, PDO::PARAM_STR);
	$result->execute();

	$aux = null;
	while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
		$alumnosEXP[] = array_map('utf8_encode', $fila);
	}	
	$alumnos[1] = $aux;

	echo json_encode($alumnos);

?>