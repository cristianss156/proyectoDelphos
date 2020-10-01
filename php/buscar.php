<?php

$conexion = mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$datosBusqueda = $_REQUEST["datosBusqueda"];
$datos_php = json_decode($datosBusqueda, true);

if($datos_php["tipo"] === "amonestaciones") {
	$result = mysqli_query($conexion, "SELECT a.CodAmonestacion, a.Fecha_Amonestacion, alu.Nombre, asig.NombreAsig, c.descripcion FROM amonestaciones a, alumnos alu, asignaturas asig, causas_amonestacion c WHERE idalumno='" . $datos_php["dni"] . "' AND dni='" . $datos_php["dni"] . "' AND asig.CodAsignatura=a.CodAsignatura AND CodCausa_Amonestacion=a.CausaAmonestacion AND a.Fecha_Firma IS NULL") or die("Error al buscar.");
} else if($datos_php["tipo"] === "expulsiones") {
	$result = mysqli_query($conexion, "SELECT e.CodExpulsiones, e.Fecha_Expulsion, alu.Nombre, asig.NombreAsig, c.descripcion FROM expulsiones e, alumnos alu, asignaturas asig, causa_expulsion c WHERE idalumno='" . $datos_php["dni"] . "' AND dni='" . $datos_php["dni"] . "' AND asig.CodAsignatura=e.CodAsignatura AND CodCausa_Expulsion=e.CausaExpulsion AND e.Fecha_Firma IS NULL") or die("Error al buscar.");
}

$i = 0;

while($fila = mysqli_fetch_array($result)) {
	$resultBusqueda[$i]=$fila;
	$i++;
}
if(isset($resultBusqueda)) {
	echo json_encode($resultBusqueda);
} else{
	echo "Sin resultado";
}

mysqli_close($conexion);