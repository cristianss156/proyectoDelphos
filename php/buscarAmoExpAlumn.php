<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$_dni=$_REQUEST["dni"];

$result=mysqli_query($conexion, "select al.nombre as NOMBRE, al.apellidos as APELLIDOS, ca.descripcion as CAUSA, a.Fecha_Amonestacion as FECHA from alumnos al, amonestaciones a, causas_amonestacion ca where al.DNI='$_dni' and a.IdAlumno='$_dni' and a.CausaAmonestacion=ca.CodCausa_Amonestacion;") or die ("Error al consultar.");

$result2=mysqli_query($conexion, "select al.nombre as NOMBRE, al.apellidos as APELLIDOS, ce.descripcion as CAUSA, e.Fecha_Expulsion as FECHA from alumnos al, expulsiones e, causa_expulsion ce where al.DNI='$_dni' and e.IdAlumno='$_dni' and e.CausaExpulsion=ce.CodCausa_Expulsion;") or die ("Error al consultar.");

$i=0;
$j=0;
$alumnos=null;
$alumnosAMO=null;
$alumnosEXP=null;

while($fila=mysqli_fetch_array($result)){
	$alumnosAMO[$i]=$fila;
	$i++;
}

while($fila2=mysqli_fetch_array($result2)){
	$alumnosEXP[$j]=$fila2;
	$j++;
}

$alumnos[0]=$alumnosAMO;
$alumnos[1]=$alumnosEXP;

echo json_encode($alumnos);

mysqli_close($conexion);