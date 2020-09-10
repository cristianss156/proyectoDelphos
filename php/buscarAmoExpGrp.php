<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$_grupo=$_REQUEST["grp"];

$result=mysqli_query($conexion, "select alu.dni as DNI, alu.nombre as NOMBRE, alu.apellidos as APELLIDOS, alu.codCurso as CURSO, count(*) as CUENTA from alumnos alu, amonestaciones amo, causas_amonestacion ca where amo.CodCurso='$_grupo' and alu.dni=amo.idalumno and ca.codcausa_Amonestacion=amo.causaamonestacion group by alu.dni;") or die ("Error al consultar.");

$result2=mysqli_query($conexion, "select alu.dni as DNI, alu.nombre as NOMBRE, alu.apellidos as APELLIDOS, alu.codCurso as CURSO, count(*) as CUENTA from alumnos alu, expulsiones exp, causa_expulsion ce where exp.CodCurso='$_grupo' and alu.dni=exp.idalumno and ce.codcausa_expulsion=exp.causaexpulsion group by alu.dni;") or die ("Error al consultar.");

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