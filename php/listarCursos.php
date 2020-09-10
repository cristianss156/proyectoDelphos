<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$result=mysqli_query($conexion, "select * from cursos") or die ("Error al consultar.");

$i=0;

while($fila=mysqli_fetch_array($result)){
	$vuelta[$i]=$fila;
	$i++;
}

echo json_encode($vuelta);

mysqli_close($conexion);