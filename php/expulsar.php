<?php

	$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

	$datosExp=$_REQUEST["datosExpulsion"];
	$datos_php=json_decode($datosExp, true);
	$codExpulsion=getcodigo();
	$codSancion=getcodigo();

	function getcodigo() {
	    $patron = '1234567890abcdefghijklmnopqrstuvwxyz';
	    $max = strlen($patron)-1;
	    $cadena='';
	    for($i=0;$i<9;$i++){
	        $cadena .= $patron{mt_rand(0,$max)};
	    }
	    return $cadena;
	}

	if($datos_php["tipo"]==="normal"){
		$result=mysqli_query($conexion, "insert into expulsiones values ('$codExpulsion', '".$datos_php["alumno"]."', '".$datos_php["profesor"]."', '".$datos_php["asignatura"]."', '".$datos_php["causa"]."', '".$datos_php["curso"]."', '".$datos_php["fecha"]."', '".$datos_php["hora"]."', null, null);") or die ("Error al insertar.");
	}

	if($datos_php["tipo"]==="SancionDirecta"){

    $resultCausa=mysqli_query($conexion, "select descripcion from causa_expulsion where CodCausa_Expulsion='".$datos_php["causa"]."'");
    $causaSan=mysqli_fetch_array($resultCausa);
    $causa=$causaSan["descripcion"];

		$result=mysqli_query($conexion, "insert into expulsiones values ('$codExpulsion', '".$datos_php["alumno"]."', '".$datos_php["profesor"]."', '".$datos_php["asignatura"]."', '".$datos_php["causa"]."', '".$datos_php["curso"]."', '".$datos_php["fecha"]."', '".$datos_php["hora"]."', null, null);") or die ("Error al insertar.");
		$result2=mysqli_query($conexion, "insert into sanciones values ('$codSancion', '".$datos_php["alumno"]."', '".$datos_php["profesor"]."', '$causa', '".$datos_php["fecha"]."')") or die ("Error al insertar.");
		$result3=mysqli_query($conexion, "update expulsiones set CodSancion='$codSancion' where CodExpulsiones='$codExpulsion'") or die ("Error al actualizar");

	}

	mysqli_close($conexion);

?>