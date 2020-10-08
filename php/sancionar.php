<?php

	$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

	$datosSancion=$_REQUEST["datosSancion"];
	$datos_php=json_decode($datosSancion, true);
	$comp=0;
	$codSancion=getcodSancion();

	function getcodSancion() {
	    $patron = '1234567890abcdefghijklmnopqrstuvwxyz';
	    $max = strlen($patron)-1;
	    $cadena='';
	    for($i=0;$i<9;$i++){
	        $cadena .= $patron{mt_rand(0,$max)};
	    }
	    return $cadena;
	}

	if(isset($datos_php["codigo"]) && isset($datos_php["sancion"])!='' && $datos_php["fecha"]!=''){
		$result=mysqli_query($conexion, "insert into sanciones values('$codSancion', '".$datos_php["alumno"]."', '".$datos_php["profesor"]."', '".$datos_php["sancion"]."', '".$datos_php["fecha"]."')") or die ("Error al insertar.");
		$result2=mysqli_query($conexion, "update amonestaciones set CodSancion='$codSancion' where CodAmonestacion='".$datos_php["codigo"]."'");
		$comp=1;
	}

	echo $comp;

	mysqli_close($conexion);

?>