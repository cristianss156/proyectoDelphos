<?php

	require_once('conexionBD.php');

	$datosExp = $_REQUEST["datosExpulsion"];
	$datos_php = json_decode($datosExp, true);
	$codExpulsion = getcodigo();
	$codSancion = getcodigo();

	function getcodigo() {
    $patron = '1234567890abcdefghijklmnopqrstuvwxyz';
    $max = strlen($patron) - 1;
    $cadena = '';
    for($i = 0; $i < 9; $i++) {
      $cadena .= $patron{mt_rand(0, $max)};
    }
    return $cadena;
	}

	$result = $conexion->prepare("INSERT INTO expulsiones VALUES (:_CODE, :_ALUM, :_PROF, :_ASIG, :_CAUS, :_CURS, :_FECH, :_HORA);");
	$result->bindvalue(':_CODE', $codExpulsion, PDO::PARAM_STR);
	$result->bindvalue(':_ALUM', $datos_php["alumno"], PDO::PARAM_STR);
	$result->bindvalue(':_PROF', $datos_php["profesor"], PDO::PARAM_STR);
	$result->bindvalue(':_ASIG', $datos_php["asignatura"], PDO::PARAM_STR);
	$result->bindvalue(':_CAUS', $datos_php["causa"], PDO::PARAM_STR);
	$result->bindvalue(':_CURS', $datos_php["curso"], PDO::PARAM_STR);
	$result->bindvalue(':_FECH', $datos_php["fecha"], PDO::PARAM_STR);
	$result->bindvalue(':_HORA', $atos_php["hora"], PDO::PARAM_STR);
	$result->execute();

	if($datos_php["tipo"] === "SancionDirecta") {
    $resultCausa = $conexion->prepare("SELECT descripcion FROM causa_expulsion WHERE CodCausa_Expulsion=:_CAUS");
    $resultCausa->bindvalue(':_CAUS', $datos_php["causa"], PDO::PARAM_STR);
    $resultCausa->execute();

    if(count($resultCausa) !== 0) {
			while($fila = $resultCausa->fetch(PDO::FETCH_ASSOC)){
				$vuelta[] = array_map('utf8_encode', $fila);
			}
	    $causa = $vuelta["descripcion"];
			
			$result2 = $conexion->prepare("INSERT INTO sanciones VALUES (:_CODS, :_ALUM, :_PROF, :_CAUS, :_FECH)");
			$result2->bindvalue(':_CODS', $codSancion, PDO::PARAM_STR);
			$result2->bindvalue(':_ALUM', $datos_php["alumno"], PDO::PARAM_STR);
			$result2->bindvalue(':_PROF', $datos_php["profesor"], PDO::PARAM_STR);
			$result2->bindvalue(':_CAUS', $causa, PDO::PARAM_STR);
			$result2->bindvalue(':_FECH', $datos_php["fecha"], PDO::PARAM_STR);
			$result2->execute;

			$result2 = $conexion->prepare("UPDATE expulsiones SET CodSancion=:_CODS WHERE CodExpulsiones=:_CODE");
			$result2->bindvalue(':_CODS', $codSancion, PDO::PARAM_STR);
			$result2->bindvalue(':_CODE', $codExpulsion, PDO::PARAM_STR);
			$result2->execute();
		}
	}	

?>