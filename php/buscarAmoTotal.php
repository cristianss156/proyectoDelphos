<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$result=mysqli_query($conexion, "select p.nombre as NOMBRE, p.apellidos as APELLIDOS, count(*) as TOTAL from amonestaciones a, profesores p where p.CodProfesor=a.CodProfesor group by p.nombre;") or die ("Error al consultar.");

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