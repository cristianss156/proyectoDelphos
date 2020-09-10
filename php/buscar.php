<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$datosBusqueda=$_REQUEST["datosBusqueda"];
$datos_php=json_decode($datosBusqueda, true);

if($datos_php["tipo"]==="amonestaciones"){
	$result=mysqli_query($conexion, "select a.CodAmonestacion, a.Fecha_Amonestacion, alu.Nombre, asig.NombreAsig, c.descripcion from amonestaciones a, alumnos alu, asignaturas asig, causas_amonestacion c where idalumno='".$datos_php["dni"]."'  and dni='".$datos_php["dni"]."' and asig.CodAsignatura=a.CodAsignatura and CodCausa_Amonestacion=a.CausaAmonestacion and a.Fecha_Firma is null") or die ("Error al buscar.");
}
else if($datos_php["tipo"]==="expulsiones"){
	$result=mysqli_query($conexion, "select e.CodExpulsiones, e.Fecha_Expulsion, alu.Nombre, asig.NombreAsig, c.descripcion from expulsiones e, alumnos alu, asignaturas asig, causa_expulsion c where idalumno='".$datos_php["dni"]."'  and dni='".$datos_php["dni"]."' and asig.CodAsignatura=e.CodAsignatura and CodCausa_Expulsion=e.CausaExpulsion and e.Fecha_Firma is null") or die ("Error al buscar.");
}

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