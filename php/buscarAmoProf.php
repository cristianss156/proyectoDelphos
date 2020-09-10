<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$_prof=$_REQUEST["prof"];

$result=mysqli_query($conexion, "select ca.descripcion as CAUSA, amo.Fecha_Amonestacion as FECHA, alu.dni as DNI, alu.nombre as NOMBRE, alu.Apellidos as APELLIDOS from alumnos alu, amonestaciones amo, causas_amonestacion ca where amo.CodProfesor='$_prof' and amo.IdAlumno=alu.DNI and ca.CodCausa_Amonestacion=amo.CausaAmonestacion") or die ("Error al consultar.");

$i=0;
$total=null;

while($fila=mysqli_fetch_array($result)){
	$totalAMO[$i]=$fila;
	$i++;
}

if(isset($totalAMO)){
	$total[]=$totalAMO;
}

echo json_encode($total);

mysqli_close($conexion);