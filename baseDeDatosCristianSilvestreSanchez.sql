CREATE DATABASE  IF NOT EXISTS `delphosdbcristian` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `delphosdbcristian`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: delphosdbcristian
-- ------------------------------------------------------
-- Server version	5.6.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumnos` (
  `DNI` varchar(9) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellidos` varchar(100) DEFAULT NULL,
  `Fecha_nacimiento` date DEFAULT NULL,
  `CodCurso` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`DNI`),
  KEY `Alumnos_FK_idx` (`CodCurso`),
  CONSTRAINT `Alumnos_FK` FOREIGN KEY (`CodCurso`) REFERENCES `cursos` (`CodCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES ('11111111A','Estefania','Moreno','1992-06-03','1DAW'),('11111112J','Daniel','Martinez','1991-04-23','2DAW'),('11111113K','Guillermo','Gonzalez','1992-05-14','2DAM'),('22222222B','Rafael','Sevilla','1992-04-15','1DAM'),('33333333C','Juan Carlos','Olivas','1993-06-23','2DAM'),('44444444D','Jose Antonio','Heredia','1990-03-17','2DAW'),('55555555E','Matias','Talaya','1990-08-12','1DAW'),('66666666F','Sergio','Andoni','1989-12-05','1DAM'),('74520993G','Cristian','Silvestre','1991-11-25','2DAW'),('77777777G','Andres','Garcia','1988-04-07','2DAM'),('88888888H','Ruben','Garcia','1989-07-05','1DAW'),('99999999I','Daniel','Gallego','1990-02-26','1DAM');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amonestaciones`
--

DROP TABLE IF EXISTS `amonestaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amonestaciones` (
  `CodAmonestacion` varchar(10) NOT NULL,
  `IdAlumno` varchar(9) DEFAULT NULL,
  `CodProfesor` varchar(10) DEFAULT NULL,
  `CodAsignatura` varchar(35) DEFAULT NULL,
  `CausaAmonestacion` int(11) DEFAULT NULL,
  `CodCurso` varchar(10) DEFAULT NULL,
  `Fecha_Amonestacion` date DEFAULT NULL,
  `Hora_Amonestacion` time DEFAULT NULL,
  `Fecha_Firma` date DEFAULT NULL,
  `CodSancion` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`CodAmonestacion`),
  KEY `amo_Alumno_FK_idx` (`IdAlumno`),
  KEY `amo_Asignatura_FK_idx` (`CodAsignatura`),
  KEY `amo_Causa_FK_idx` (`CausaAmonestacion`),
  KEY `amo_Curso_FK_idx` (`CodCurso`),
  CONSTRAINT `amo_Alumno_FK` FOREIGN KEY (`IdAlumno`) REFERENCES `alumnos` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `amo_Asignatura_FK` FOREIGN KEY (`CodAsignatura`) REFERENCES `asignaturas` (`CodAsignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `amo_Causa_FK` FOREIGN KEY (`CausaAmonestacion`) REFERENCES `causas_amonestacion` (`CodCausa_Amonestacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `amo_Curso_FK` FOREIGN KEY (`CodCurso`) REFERENCES `cursos` (`CodCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amonestaciones`
--

LOCK TABLES `amonestaciones` WRITE;
/*!40000 ALTER TABLE `amonestaciones` DISABLE KEYS */;
INSERT INTO `amonestaciones` VALUES ('2jxo7kkep','74520993G','000002_DG','DesWebEnSer',2,'2DAW','2015-02-10','10:30:00','2015-02-10','04rs1sqyd'),('4wx5zabm6','33333333C','000005_EG','AcADat',3,'2DAM','2015-02-25','08:56:00',NULL,NULL),('y5jw0nq7f','11111111A','000005_EG','GesBBDD',4,'1DAW','2015-02-25','12:54:00',NULL,NULL),('ycgtn6o63','74520993G','000003_IG','DisInterWeb',1,'2DAW','2015-02-13','12:34:00',NULL,NULL);
/*!40000 ALTER TABLE `amonestaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaturas`
--

DROP TABLE IF EXISTS `asignaturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignaturas` (
  `CodAsignatura` varchar(35) NOT NULL,
  `CodCurso` varchar(10) NOT NULL,
  `NombreAsig` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`CodAsignatura`,`CodCurso`),
  KEY `Asignaturas_FK_idx` (`CodCurso`),
  CONSTRAINT `Asignaturas_FK` FOREIGN KEY (`CodCurso`) REFERENCES `cursos` (`CodCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas`
--

LOCK TABLES `asignaturas` WRITE;
/*!40000 ALTER TABLE `asignaturas` DISABLE KEYS */;
INSERT INTO `asignaturas` VALUES ('AcADat','2DAM','Acceso a datos'),('DesApliWeb','2DAW','Despliegue de aplicaciones web'),('DesWebEnCli','2DAW','Desarrollo web en entorno cliente'),('DesWebEnSer','2DAW','Desarrollo web en entorno servidor'),('DisInterWeb','2DAW','Diseño de interfaces web'),('EntDeDes','1DAW','Entornos de desarrollo'),('GesBBDD','1DAM','Bases de Datos'),('GesBBDD','1DAW','Bases de Datos'),('LengDeMar','1DAM','Lenguaje de marcas'),('LengDeMar','1DAW','Lenguaje de marcas'),('ProgMulDisMov','2DAM','Programación multimedia y dispositivos móviles');
/*!40000 ALTER TABLE `asignaturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `causa_expulsion`
--

DROP TABLE IF EXISTS `causa_expulsion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `causa_expulsion` (
  `CodCausa_Expulsion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`CodCausa_Expulsion`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `causa_expulsion`
--

LOCK TABLES `causa_expulsion` WRITE;
/*!40000 ALTER TABLE `causa_expulsion` DISABLE KEYS */;
INSERT INTO `causa_expulsion` VALUES (1,'Ofensa a un compañero'),(2,'Pelearse con un compañero'),(3,'Indisplina o falta de respeto al profesor'),(4,'Interrupcion del normal desarrollo de la clase'),(5,'Deterioro del material'),(6,'Quemar el centro');
/*!40000 ALTER TABLE `causa_expulsion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `causas_amonestacion`
--

DROP TABLE IF EXISTS `causas_amonestacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `causas_amonestacion` (
  `CodCausa_Amonestacion` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`CodCausa_Amonestacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `causas_amonestacion`
--

LOCK TABLES `causas_amonestacion` WRITE;
/*!40000 ALTER TABLE `causas_amonestacion` DISABLE KEYS */;
INSERT INTO `causas_amonestacion` VALUES (1,'Molestar continuamente en clase'),(2,'No atiende a las explicaciones del profesor'),(3,'No traer el material reiteradamente'),(4,'Retrasos reiterados a clase'),(5,'No tener el cuaderno de alumno');
/*!40000 ALTER TABLE `causas_amonestacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cursos` (
  `CodCurso` varchar(10) NOT NULL,
  `CodTutor` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`CodCurso`),
  KEY `curso_FK_idx` (`CodTutor`),
  CONSTRAINT `curso_FK` FOREIGN KEY (`CodTutor`) REFERENCES `profesores` (`CodProfesor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES ('2DAM','000001_RR'),('2DAW','000003_IG'),('1DAM','000004_PG'),('1DAW','000005_EG');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expulsiones`
--

DROP TABLE IF EXISTS `expulsiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expulsiones` (
  `CodExpulsiones` varchar(10) NOT NULL,
  `IdAlumno` varchar(9) DEFAULT NULL,
  `CodProfesor` varchar(10) DEFAULT NULL,
  `CodAsignatura` varchar(35) DEFAULT NULL,
  `CausaExpulsion` int(11) DEFAULT NULL,
  `CodCurso` varchar(10) DEFAULT NULL,
  `Fecha_Expulsion` date DEFAULT NULL,
  `Hora_Expulsion` time DEFAULT NULL,
  `Fecha_Firma` date DEFAULT NULL,
  `CodSancion` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`CodExpulsiones`),
  KEY `exp_Alumno_FK_idx` (`IdAlumno`),
  KEY `exp_Asignatura_FK_idx` (`CodAsignatura`),
  KEY `exp_Causa_FK_idx` (`CausaExpulsion`),
  KEY `exp_Curso_FK_idx` (`CodCurso`),
  KEY `exp_Profesor_FK_idx` (`CodProfesor`),
  CONSTRAINT `exp_Alumno_FK` FOREIGN KEY (`IdAlumno`) REFERENCES `alumnos` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `exp_Asignatura_FK` FOREIGN KEY (`CodAsignatura`) REFERENCES `asignaturas` (`CodAsignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `exp_Causa_FK` FOREIGN KEY (`CausaExpulsion`) REFERENCES `causa_expulsion` (`CodCausa_Expulsion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `exp_Curso_FK` FOREIGN KEY (`CodCurso`) REFERENCES `cursos` (`CodCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `exp_Profesor_FK` FOREIGN KEY (`CodProfesor`) REFERENCES `profesores` (`CodProfesor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expulsiones`
--

LOCK TABLES `expulsiones` WRITE;
/*!40000 ALTER TABLE `expulsiones` DISABLE KEYS */;
INSERT INTO `expulsiones` VALUES ('6zczvz8en','11111113K','000001_RR','AcADat',2,'2DAM','2015-03-09','10:53:00',NULL,'1ezhst6ql'),('7kncdcl1l','22222222B','000004_PG','LengDeMar',1,'1DAM','2015-02-25','08:45:00',NULL,NULL),('ccb6hxltq','22222222B','000005_EG','GesBBDD',4,'1DAM','2015-02-26','13:45:00',NULL,NULL),('jo77lxsaq','74520993G','000002_DG','DesWebEnSer',3,'2DAW','2015-02-20','13:45:00',NULL,'ws01c26kl'),('tq6bj3fmg','33333333C','000002_DG','ProgMulDisMov',2,'2DAM','2015-02-11','12:55:00','2015-02-12',NULL);
/*!40000 ALTER TABLE `expulsiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesores` (
  `CodProfesor` varchar(10) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellidos` varchar(100) DEFAULT NULL,
  `Password` varchar(10) DEFAULT NULL,
  `Permisos` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CodProfesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES ('000001_RR','Rosa','Ropero','admin','Direccion'),('000002_DG','Daniel','Garcia','hola-20','Profesor'),('000003_IG','Inma','Galdon','hola-21','Jefatura'),('000004_PG','Pilar','Garcia','hola-22','Profesor'),('000005_EG','Elvira','Gonzalez','hola-23','Profesor');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanciones`
--

DROP TABLE IF EXISTS `sanciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sanciones` (
  `CodSancion` varchar(10) NOT NULL,
  `IdAlumno` varchar(9) DEFAULT NULL,
  `CodProfesor` varchar(10) DEFAULT NULL,
  `Sancion` varchar(200) DEFAULT NULL,
  `Fecha_sancion` date DEFAULT NULL,
  PRIMARY KEY (`CodSancion`),
  KEY `san_Alumno_FK_idx` (`IdAlumno`),
  KEY `san_Profesor_FK_idx` (`CodProfesor`),
  CONSTRAINT `san_Alumno_FK` FOREIGN KEY (`IdAlumno`) REFERENCES `alumnos` (`DNI`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `san_Profesor_FK` FOREIGN KEY (`CodProfesor`) REFERENCES `profesores` (`CodProfesor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanciones`
--

LOCK TABLES `sanciones` WRITE;
/*!40000 ALTER TABLE `sanciones` DISABLE KEYS */;
INSERT INTO `sanciones` VALUES ('04rs1sqyd','74520993G','000003_IG','Devolver el euro','2015-02-14'),('1ezhst6ql','11111113K','000001_RR','Pelearse con un compañero','2015-03-09'),('ws01c26kl','74520993G','000001_RR','Indisplina o falta de respeto al profesor','2015-02-20');
/*!40000 ALTER TABLE `sanciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-09 19:09:59
