<?php

$conexion=mysqli_connect("localhost", "root", "root", "delphosdbcristian") or die("Fallo en la conexion.");

$datosAmo=$_REQUEST["datosAmonestacion"];
$datos_php=json_decode($datosAmo, true);
$codAmonestacion=getcodAmonestacion();

function getcodAmonestacion() {
    $patron = '1234567890abcdefghijklmnopqrstuvwxyz';
    $max = strlen($patron)-1;
    $cadena='';
    for($i=0;$i<9;$i++){
        $cadena .= $patron{mt_rand(0,$max)};
    }
    return $cadena;
}

$result=mysqli_query($conexion, "insert into amonestaciones values ('$codAmonestacion', '".$datos_php["alumno"]."', '".$datos_php["profesor"]."', '".$datos_php["asignatura"]."', '".$datos_php["causa"]."', '".$datos_php["curso"]."', '".$datos_php["fecha"]."', '".$datos_php["hora"]."', null, null);") or die ("Error al insertar.");

mysqli_close($conexion);