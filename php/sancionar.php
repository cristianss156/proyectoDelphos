<?php

	require_once('conexionBD.php');

	$datosSancion = $_REQUEST["datosSancion"];
	$datos_php = json_decode($datosSancion, true);
	$comp = 0;
	$codSancion = getcodSancion();

	function getcodSancion() {
    $patron = '1234567890abcdefghijklmnopqrstuvwxyz';
    $max = strlen($patron) - 1;
    $cadena = '';
    for($i = 0; $i < 9; $i++) {
      $cadena .= $patron{mt_rand(0, $max)};
    }
    return $cadena;
	}

	//if(isset($datos_php["codigo"]) && isset($datos_php["sancion"])!='' && $datos_php["fecha"]!=''){
		$result = $conexion->prepare("INSERT INTO sanciones VALUES(:_CODS, :_ALUM, :_PROF, :_SANC, :_FECH)");
		$result->bindvalue(':_CODS', $codSancion, PDO::PARAM_STR);
		$result->bindvalue(':_ALUM', $datos_php["alumno"], PDO::PARAM_STR);
		$result->bindvalue(':_PROF', $datos_php["profesor"], PDO::PARAM_STR);
		$result->bindvalue(':_SANC', $datos_php["sancion"], PDO::PARAM_STR);
		$result->bindvalue(':_FECH', $datos_php["fecha"], PDO::PARAM_STR);
		$result->execute();

		$result2=$conexion->prepare("UPDATE amonestaciones SET CodSancion=:_CODS WHERE CodAmonestacion=:_CODA");
		$result2->bindvalue(':_CODS', $codSancion, PDO::PARAM_STR);
		$result2->bindvalue(':_CODA', $datos_php["codigo"], PDO::PARAM_STR);
		$result2->execute();
	//}

?>