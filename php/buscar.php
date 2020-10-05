<?php
	require_once('conexionBD.php');

	$datosBusqueda = $_REQUEST["datosBusqueda"];
	$datos_php = json_decode($datosBusqueda, true);

	if($datos_php["tipo"] === "amonestaciones") {
		$result = $conexion->prepare("SELECT DISTINCT a.CodAmonestacion, a.Fecha_Amonestacion, alu.Nombre, asig.NombreAsig, c.descripcion FROM amonestaciones a, alumnos alu, asignaturas asig, causas_amonestacion c WHERE idalumno=:_DNI AND dni=:_DNI AND asig.CodAsignatura=a.CodAsignatura AND CodCausa_Amonestacion=a.CausaAmonestacion AND a.Fecha_Firma IS NULL");
	} else if($datos_php["tipo"] === "expulsiones") {
		$result = $conexion->prepare("SELECT DISTINCT e.CodExpulsiones, e.Fecha_Expulsion, alu.Nombre, asig.NombreAsig, c.descripcion FROM expulsiones e, alumnos alu, asignaturas asig, causa_expulsion c WHERE idalumno=:_DNI AND dni=:_DNI AND asig.CodAsignatura=e.CodAsignatura AND CodCausa_Expulsion=e.CausaExpulsion AND e.Fecha_Firma IS NULL");
	}
	$result->bindValue(':_DNI', $datos_php["dni"], PDO::PARAM_STR);
	$result->execute();

	if(count($result) !== 0) {
		while($fila = $result->fetch(PDO::FETCH_ASSOC)) {
			$resultado[] = array_map('utf8_encode', $fila);
		}
		echo json_encode($resultado);
	} else { echo 0; }
?>