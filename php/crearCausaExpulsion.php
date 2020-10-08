<?php

	$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

	$nuevaExp=$_REQUEST["causa"];

	$result=mysqli_query($conexion, "insert into causa_expulsion (descripcion) values ('$nuevaExp');") or die ("Error al insertar.");

	mysqli_close($conexion);

?>