<?php

	require_once('conexionBD.php');

	$datosFirma = $_REQUEST["datosFirma"];
	$datos_php = json_decode($datosFirma, true);
	//$comp = 0;

	//if(isset($datos_php["tipo"]) && isset($datos_php["codigo"]) && $datos_php["fecha"] != ''){
	if($datos_php["tipo"] === "amonestaciones") {
		$result = $conexion->prepare("UPDATE amonestaciones SET fecha_firma=:_FECH WHERE CodAmonestacion=:_CODI");
	} else if($datos_php["tipo"] === "expulsiones") {
		$result = $conexion->prepare("UPDATE expulsiones SET Fecha_Firma=:_FECH WHERE CodExpulsiones=:_CODI");
	}

	$result->bindvalue(':_FECH', $datos_php["fecha"], PDO::PARAM_STR);
	$result->bindvalue(':_CODI', $datos_php["codigo"], PDO::PARAM_STR);
	$result->execute();

	if($result->rowCount() == 0) { echo 0; }
	else { echo 1; }
	//}

	//echo $comp;

?>