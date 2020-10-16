<?php

	try {
			$conexion = new PDO('mysql:host=localhost;dbname=delphosdbcristian', 'root', 'root', array(PDO::ATTR_PERSISTENT => true));
		} catch(PDOException $e) {
			die( $e->getMessage() );
		}
		
?>