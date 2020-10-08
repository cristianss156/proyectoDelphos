<?php
	
	require_once('conexionBD.php');

	$datosBusqueda = $_REQUEST["datosBusqueda"];

	$result = $conexion->prepare("SELECT a.CodAmonestacion, a.Fecha_Amonestacion, alu.Nombre, asig.NombreAsig, c.descripcion FROM amonestaciones a, alumnos alu, asignaturas asig, causas_amonestacion c WHERE idalumno=:_DNI  AND dni=:_DNI AND asig.CodAsignatura=a.CodAsignatura AND CodCausa_Amonestacion=a.CausaAmonestacion AND a.CodSancion IS NULL");
	$result->bindValue(':_DNI', $datosBusqueda, PDO::PARAM_STR);
	$result->execute();

	if(count($result) !== 0) {
		while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
			$resultBusqueda[] = array_map('utf8_encode', $fila);
		}
		echo json_encode($resultBusqueda);
	} else{ echo 0; }

?>