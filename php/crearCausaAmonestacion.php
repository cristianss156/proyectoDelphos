<?php

	$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

	$nuevaAmo=$_REQUEST["causa"];

	$result=mysqli_query($conexion, "insert into causas_amonestacion (descripcion) values ('$nuevaAmo');") or die ("Error al insertar.");

	mysqli_close($conexion);

?>