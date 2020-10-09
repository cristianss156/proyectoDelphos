<?php

	require_once('conexionBD.php');

	$_prof = $_REQUEST["prof"];

	$result = $conexion->prepare("SELECT ca.descripcion AS CAUSA, amo.Fecha_Amonestacion AS FECHA, alu.dni AS DNI, alu.nombre AS NOMBRE, alu.Apellidos AS APELLIDOS FROM alumnos alu, amonestaciones amo, causas_amonestacion ca WHERE amo.CodProfesor=:_PROF AND amo.IdAlumno=alu.DNI AND ca.CodCausa_Amonestacion=amo.CausaAmonestacion;");
	$result->bindValue(':_PROF', $_prof, PDO::PARAM_STR);
	$result->execute();

	if(count($result) !== 0) {
		while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
			$totalAMO[] = array_map('utf8_encode', $fila);
			echo count($totalAMO);
		}
		//echo json_encode($totalAMO);
	} else { echo 0; }

?>