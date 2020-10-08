<?php

	require_once('conexionBD.php');

	$datosAmo = $_REQUEST["datosAmonestacion"];
	$datos_php = json_decode($datosAmo, true);
	$codAmonestacion = getcodAmonestacion();

	function getcodAmonestacion() {
    $patron = '1234567890abcdefghijklmnopqrstuvwxyz';
    $max = strlen($patron) - 1;
    $cadena = '';
    for($i = 0; $i < 9; $i++) {
      $cadena .= $patron{ mt_rand(0, $max) };
    }
    return $cadena;
	}

	$result = $conexion->prepare("INSERT INTO amonestaciones (CodAmonestacion, IdAlumno, CodProfesor, CodAsignatura, CausaAmonestacion, CodCurso, Fecha_Amonestacion, Hora_Amonestacion) VALUES (:_codAdmo, :_alumn, :_prof, :_asig, :_causa, :_curso, :_fecha, :_hora);");
	$result->bindValue(':_codAdmo', $codAmonestacion, PDO::PARAM_STR);
	$result->bindValue(':_alumn', $datos_php["alumno"], PDO::PARAM_STR);
	$result->bindValue(':_prof', $datos_php["profesor"], PDO::PARAM_STR);
	$result->bindValue(':_asig', $datos_php["asignatura"], PDO::PARAM_STR);
	$result->bindValue(':causa', $datos_php["causa"], PDO::PARAM_STR);
	$result->bindValue(':_curso', $datos_php["curso"], PDO::PARAM_STR);
	$result->bindValue(':_fecha', $datos_php["fecha"], PDO::PARAM_STR);
	$result->bindValue(':_hora', $datos_php["hora"], PDO::PARAM_STR);
	$result->execute();

	if($result->rowCount() == 0) { echo 0; }
	else { echo 1; }

?>