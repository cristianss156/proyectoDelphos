<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$datosBusqueda=$_REQUEST["datosBusqueda"];

$result=mysqli_query($conexion, "select a.CodAmonestacion, a.Fecha_Amonestacion, alu.Nombre, asig.NombreAsig, c.descripcion from amonestaciones a, alumnos alu, asignaturas asig, causas_amonestacion c where idalumno='$datosBusqueda'  and dni='$datosBusqueda' and asig.CodAsignatura=a.CodAsignatura and CodCausa_Amonestacion=a.CausaAmonestacion and a.CodSancion is null") or die ("Error al buscar.");

$i=0;

while($fila=mysqli_fetch_array($result)){
	$resultBusqueda[$i]=$fila;
	$i++;
}
if(isset($resultBusqueda)){
	echo json_encode($resultBusqueda);
}
else{
	echo "Sin resultado";
}

mysqli_close($conexion);