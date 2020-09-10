<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$result=mysqli_query($conexion, "select * from causas_amonestacion") or die ("Error al consultar.");

$i=0;

while($fila=mysqli_fetch_array($result)){
	$causas_amonestacion[$i]=$fila;
	$i++;
}

echo json_encode($causas_amonestacion);

mysqli_close($conexion);