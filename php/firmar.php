<?php

	$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

	$datosFirma=$_REQUEST["datosFirma"];
	$datos_php=json_decode($datosFirma, true);
	$comp=0;

	if(isset($datos_php["tipo"]) && isset($datos_php["codigo"]) && $datos_php["fecha"]!=''){
		if($datos_php["tipo"]==="amonestaciones"){
			$result=mysqli_query($conexion, "update amonestaciones set fecha_firma='".$datos_php["fecha"]."' where CodAmonestacion='".$datos_php["codigo"]."'") or die ("Error al actualizar.");
		}
		else if($datos_php["tipo"]==="expulsiones"){
			$result=mysqli_query($conexion, "update expulsiones set Fecha_Firma='".$datos_php["fecha"]."' where CodExpulsiones='".$datos_php["codigo"]."'") or die ("Error al actualizar.");
		}

		$comp=1;
	}

	echo $comp;

	mysqli_close($conexion);

?>