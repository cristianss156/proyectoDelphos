<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$result=mysqli_query($conexion, "select a.DNI as AMO_DNI, a.Nombre as AMO_NOMBRE, a.Apellidos as AMO_APELLIDOS, a.CodCurso as AMO_CURSO, count(a.DNI) as CUENTA from alumnos a, amonestaciones am where am.IdAlumno=a.DNI and Fecha_Firma is null group by a.DNI") or die ("Error al consultar.");

$result2=mysqli_query($conexion, "select a.DNI as EXP_DNI, a.Nombre as EXP_NOMBRE, a.Apellidos as EXP_APELLIDOS, a.CodCurso as EXP_CURSO, count(a.DNI) as CUENTA from alumnos a, expulsiones e where e.IdAlumno=a.DNI and e.Fecha_Firma is null group by a.DNI") or die ("Error al consultar.");

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