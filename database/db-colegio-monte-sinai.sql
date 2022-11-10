CREATE DATABASE db_colegio_monte_sinai;

USE db_colegio_monte_sinai;

--#region TABLA E INSERT GRADOS
CREATE TABLE t_Grado(
    grado_Id INT NOT NULL PRIMARY KEY,
    grado VARCHAR(50) NOT NULL,
    seccion VARCHAR(2) NULL,
    cantidad_Alumnos INT NULL,
    cantidad_Cursos VARCHAR(15) NOT NULL,
    mensualidad DECIMAL(10,2) NOT NULL
);
INSERT INTO t_Grado VALUES(1, 'PRE-PRIMARIA','A', 0, '7 Materias',200);
INSERT INTO t_Grado VALUES(2, 'PRIMERO PRIMARIA','A', 0, '9 Materias',250);
INSERT INTO t_Grado VALUES(3, 'SEGUNDO PRIMARIA','A', 0, '9 Materias',250);
INSERT INTO t_Grado VALUES(4, 'TERCERO PRIMARIA','A', 0, '9 Materias',250);
INSERT INTO t_Grado VALUES(5, 'CUARTO PRIMARIA','A', 0, '11 Materias',250);
INSERT INTO t_Grado VALUES(6, 'QUINTO PRIMARIA','A', 0, '11 Materias',250);
INSERT INTO t_Grado VALUES(7, 'SEXTO PRIMARIA','A', 0, '11 Materias',250);
INSERT INTO t_Grado VALUES(8, 'PRIMERO BÁSICO','A', 0, '14 Materias',300);
INSERT INTO t_Grado VALUES(9, 'SEGUNDO BÁSICO','A', 0, '14 Materias',300);
INSERT INTO t_Grado VALUES(10, 'TERCERO BÁSICO','A', 0, '14 Materias',300);

--#endregion

--#region TABLA E INSERT MATERIA - CURSOS
CREATE TABLE t_Curso_Materia(
    curso_Id INT NOT NULL PRIMARY KEY,
    nombre_Curso VARCHAR(50) NOT NULL
);
INSERT INTO t_Curso_Materia VALUES(1,'DESTREZAS DE APRENDIZAJE');
INSERT INTO t_Curso_Materia VALUES(2,'COMUNICACIÓN Y LENGUAJE');
INSERT INTO t_Curso_Materia VALUES(3,'MEDIO SOCIAL Y NATURAL');
INSERT INTO t_Curso_Materia VALUES(4,'EXPRESIÓN ARTÍSTICA');
INSERT INTO t_Curso_Materia VALUES(5,'EDUCACIÓN FÍSICA');
INSERT INTO t_Curso_Materia VALUES(6,'KAQCHIKEL');
INSERT INTO t_Curso_Materia VALUES(7,'EDUCACIÓN CRISTIANA');
INSERT INTO t_Curso_Materia VALUES(8,'IDIOMA INGLÉS');
INSERT INTO t_Curso_Materia VALUES(9,'MATEMÁTICAS');
INSERT INTO t_Curso_Materia VALUES(10,'FORMACIÓN CIUDADANA');
INSERT INTO t_Curso_Materia VALUES(11,'CIENCIAS SOCIALES');
INSERT INTO t_Curso_Materia VALUES(12,'CIENCIAS NATURALES Y TECNOLOGÍA');
INSERT INTO t_Curso_Materia VALUES(13,'PRODUCTIVIDAD Y DESARROLLO');
INSERT INTO t_Curso_Materia VALUES(14,'CIENCIAS NATURALES');
INSERT INTO t_Curso_Materia VALUES(15,'CIENCIAS SOCIALES Y FORMACIÓN CIUDADANA');
INSERT INTO t_Curso_Materia VALUES(16,'EDUCACIÓN MÚSICA');
INSERT INTO t_Curso_Materia VALUES(17,'ARTES VISUALES');
INSERT INTO t_Curso_Materia VALUES(18,'TEATRO');
INSERT INTO t_Curso_Materia VALUES(19,'DANZA');
INSERT INTO t_Curso_Materia VALUES(20,'EMPRENDIMIENTO PARA LA PRODUCTIVIDAD');
INSERT INTO t_Curso_Materia VALUES(21,'TECNOLOGÍA DE APRENDIZAJE Y LA COMUNICACIÓN');
--#endregion

--#region TABLA E INSERT INTERSECCIÓN CURSO Y GRADO
CREATE TABLE t_Interseccion_Curso_Grado(
    grado_Id INT NOT NULL,
    curso_Id INT NOT NULL,
    asignado VARCHAR(3) NULL DEFAULT 'NO',
    FOREIGN KEY (grado_Id) REFERENCES t_Grado(grado_Id),
    FOREIGN KEY (curso_Id) REFERENCES t_Curso_Materia(curso_Id)
);
--preprimaria - ID: 1
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(1,1);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(1,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(1,3);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(1,4);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(1,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(1,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(1,7);
--Primero - ID: 2
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(2,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(2,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(2,8);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(2,9);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(2,3);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(2,4);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(2,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(2,10);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(2,7);
--Segundo - ID: 3
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(3,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(3,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(3,8);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(3,9);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(3,3);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(3,4);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(3,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(3,10);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(3,7);
--Tercero - ID: 4
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(4,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(4,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(4,8);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(4,9);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(4,3);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(4,4);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(4,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(4,10);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(4,7);
--Cuarto - ID: 5
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,8);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,9);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,11);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,12);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,4);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,10);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,13);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(5,7);
--Quinto - ID: 6
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,8);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,9);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,11);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,12);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,4);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,10);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,13);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(6,7);
--Sexto - ID: 7
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,8);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,9);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,11);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,12);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,4);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,10);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,13);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(7,7);
--Primero B. - ID: 8
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,9);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,8);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,14);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,15);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,16);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,17);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,18);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,19);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,20);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,21);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(8,7);
--Segundo B. - ID: 9
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,9);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,8);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,14);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,15);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,16);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,17);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,18);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,19);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,20);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,21);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(9,7);
--Tercero B. - ID: 10
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,9);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,6);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,2);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,8);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,14);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,15);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,16);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,17);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,18);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,19);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,20);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,21);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,5);
INSERT INTO t_Interseccion_Curso_Grado(grado_Id,curso_Id) VALUES(10,7);
--#endregion

--#region TABLA E INSERT MESES
CREATE TABLE t_Mes(
    mes_Id INT NOT NULL PRIMARY KEY,
    mes VARCHAR(10) NOT NULL
);
INSERT INTO t_Mes VALUES (1,'ENERO');
INSERT INTO t_Mes VALUES (2,'FEBRERO');
INSERT INTO t_Mes VALUES (3,'MARZO');
INSERT INTO t_Mes VALUES (4,'ABRIL');
INSERT INTO t_Mes VALUES (5,'MAYO');
INSERT INTO t_Mes VALUES (6,'JUNIO');
INSERT INTO t_Mes VALUES (7,'JULIO');
INSERT INTO t_Mes VALUES (8,'AGOSTO');
INSERT INTO t_Mes VALUES (9,'SEPTIEMBRE');
INSERT INTO t_Mes VALUES (10,'OCTUBRE');
INSERT INTO t_Mes VALUES (11,'NOVIEMBRE');
INSERT INTO t_Mes VALUES (12,'DICIEMBRE');
--#endregion

--#region TABLAS PRODUCTO Y REALIZAR VENTAS DE PRODUCTOS
/*V A L I D A R*//*CARRITO DE PRODUCTOS*/
/*PRODUCTO*/
CREATE TABLE t_Producto(
    producto_Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_Producto VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    foto VARCHAR(999) NULL,
    usuario_Registro VARCHAR(50) NOT NULL,
    usuario_Actualizacion VARCHAR(50) NULL,
    usuario_elimino VARCHAR(50) NULL,
    fecha_Registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_Actualizacion TIMESTAMP DEFAULT NULL,
    fecha_Eliminacion TIMESTAMP DEFAULT NULL,
    eliminado VARCHAR(3) NULL DEFAULT 'NO'
);
/*VENTA PRODUCTO*/
-- SE ELIMINO EL CAMPO json_Recibo VARCHAR(999) NOT NULL
-- LA FUNCIONALIDAD DEL CODIGO ESTA COMENTADA
CREATE TABLE t_Venta_Producto(
    venta_Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario_Registro VARCHAR(50) NOT NULL,
    fecha_Venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(100) NOT NULL,
    monto DECIMAL(10,2) NOT NULL
);
/* E X T R A */
-- SE QUITO LA RELACION DE PRODUCTO EN TABLA VENTA PRODUCTO
CREATE TABLE t_Interseccion_Venta(
    venta_Id INT NOT NULL,
    producto_Id INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (venta_Id) REFERENCES t_Venta_Producto(venta_Id),
    FOREIGN KEY (producto_Id) REFERENCES t_Producto(producto_Id)
);
/*V A L I D A R*/
/*CARRITO DE PRODUCTOS*/
-- NO SE SABE SI SE MANEJA POR EL FRONTEND
-- CREATE TABLE t_Carrito(
--     producto_Id INT NOT NULL
--     FOREIGN KEY (producto_Id) REFERENCES t_Producto(producto_Id);
-- );
--#endregion

--#region TABLA ENCARGADO Y ALUMNO
/*ENCARGADO*/
CREATE TABLE t_Encargado(
    dpi_Encargado VARCHAR(20) NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(50) NULL,
    no_Cel VARCHAR(10) NOT NULL,
    no_Tel_Casa VARCHAR(10) NULL,
    direccion VARCHAR(100) NOT NULL,
    usuario_Registro VARCHAR(50) NOT NULL,
    usuario_Actualizacion VARCHAR(50) NULL,
    fecha_Registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_Actualizacion TIMESTAMP DEFAULT NULL
);
/*ALUMNO*/
-- SE ELIMINO LLAVE POR REDUNDANCIA FOREIGN KEY (detalle_Ultimo_Pago) REFERENCES t_Pago_Colegio(pago_Id)
-- UNICAMENTE SE QUEDO LA LLAVE EN LA TABLA t_Pago_Colegio
CREATE TABLE t_Alumno(
    cui_Alumno VARCHAR(20) NOT NULL PRIMARY KEY,    
    nombre VARCHAR(100) NOT NULL,
    fecha_Nac DATE NOT NULL,
    grado_Id INT NOT NULL,
    foto VARCHAR(999) NULL,
    relacion_Encargado VARCHAR(50) NOT NULL,
    dpi_Encargado VARCHAR(20) NOT NULL,
    detalle_Ultimo_Pago INT NULL,
    pago_Inscripcion VARCHAR(3) NULL DEFAULT 'NO',
    usuario_Registro VARCHAR(50) NOT NULL,
    usuario_Actualizacion VARCHAR(50) NULL,
    fecha_Inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_Actualizacion TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (grado_Id) REFERENCES t_Grado(grado_Id),
    FOREIGN KEY (dpi_Encargado) REFERENCES t_Encargado(dpi_Encargado)
);
--#endregion

--#region TABLA EMPLEADOS
/*EMPLEADOS*/
-- SE ELIMINO LLAVE POR REDUNDANCIA FOREIGN KEY (detalle_ultimo_Pago) REFERENCES t_Pago_Salarial(pago_Id)
-- UNICAMENTE SE QUEDO LA LLAVE EN LA TABLA t_Pago_Salarial
CREATE TABLE t_Empleado(
    dpi_Empleado VARCHAR(20) NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    no_Cel VARCHAR(10) NOT NULL,
    correo VARCHAR(50) NULL,
    fecha_nac DATE NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    puesto VARCHAR(50) NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    foto VARCHAR(999) NULL,
    detalle_ultimo_Pago INT NULL,
    usuario_Registro VARCHAR(50) NOT NULL,
    usuario_Actualizacion VARCHAR(50) NULL,
    fecha_Contratacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_Actualizacion TIMESTAMP DEFAULT NULL  
);
--#endregion

--#region TABLA INTERSECCIÓN PROFESOR CON SU GRADO Y SU MATERIA
CREATE TABLE t_Interseccion_Prof_Grado_Curso(
    dpi_Empleado VARCHAR(20) NOT NULL,
    grado_Id INT NOT NULL,
    curso_Id INT NOT NULL,
    FOREIGN KEY (dpi_Empleado) REFERENCES t_Empleado(dpi_Empleado),
    FOREIGN KEY (grado_Id) REFERENCES t_Grado(grado_Id),
    FOREIGN KEY (curso_Id) REFERENCES t_Curso_Materia(curso_Id)
);
--#endregion

--#region TABLA E INSERTS TIPOS DE PAGO
CREATE TABLE t_Tipo_Pago(
    tipo_pago_Id INT NOT NULL PRIMARY KEY,
    tipo_Pago VARCHAR(30) NOT NULL
);
INSERT INTO t_Tipo_Pago VALUES(1,'PAGO INSCRIPCIÓN');
INSERT INTO t_Tipo_Pago VALUES(2,'PAGO COLEGIATURA');
INSERT INTO t_Tipo_Pago VALUES(3,'PAGO SALARIAL');
--#endregion

--#region TABLA E INSERTS ORIGEN DE PAGO
CREATE TABLE t_Origen_Pago(
    origen_pago_Id INT NOT NULL PRIMARY KEY,
    origen_Pago VARCHAR(50) NOT NULL
);
INSERT INTO t_Origen_Pago VALUES(1,'PAGO (PRESENCIAL) EN ADMINISTRACIÓN');
INSERT INTO t_Origen_Pago VALUES(2,'PAGO (VIRTUAL) DEPÓSITO O TRANSFERENCIA BANCARIA');
--#endregion

--#region TABLA PAGO INSCRIPCION Y COLEGIATURA
-- SE ELIMINO CAMPO json_Recibo VARCHAR(999) NOT NULL, tipo_pago_Id ES EL MOTIVO DEL PAGO
CREATE TABLE t_Pago_Colegio(
    pago_Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_Pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_pago_Id INT NOT NULL,
    origen_pago_Id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    cui_Alumno VARCHAR(20) NOT NULL,
    mes_Id INT NULL,
    usuario_Registro VARCHAR(50) NOT NULL,
    FOREIGN KEY (cui_Alumno) REFERENCES t_Alumno(cui_Alumno),
    FOREIGN KEY (mes_Id) REFERENCES t_Mes(mes_Id),
    FOREIGN KEY (tipo_pago_Id) REFERENCES t_Tipo_Pago(tipo_pago_Id),
    FOREIGN KEY (origen_pago_Id) REFERENCES t_Origen_Pago(origen_pago_Id)
);
--#endregion

--#region TABLA PAGO SALARIAL
-- SE ELIMINO CAMPO json_Recibo VARCHAR(999) NOT NULL, tipo_pago_Id ES EL MOTIVO DEL PAGO
/*Pago Salarial*/
CREATE TABLE t_Pago_Salarial(
    pago_Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha_Pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_pago_Id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    dpi_Empleado VARCHAR(20) NOT NULL,
    mes_Id INT NOT NULL,
    usuario_Registro VARCHAR(50) NOT NULL,
    FOREIGN KEY (dpi_Empleado) REFERENCES t_Empleado(dpi_Empleado),
    FOREIGN KEY (mes_Id) REFERENCES t_Mes(mes_Id),
    FOREIGN KEY (tipo_pago_Id) REFERENCES t_Tipo_Pago(tipo_pago_Id)
);
--#endregion

--#region TABLA USUARIOS
CREATE TABLE t_Usuario(
    userName VARCHAR(20) NOT NULL PRIMARY KEY,
    pass VARCHAR(20) NOT NULL,
    id_usuario VARCHAR(20) NULL,
    roleId VARCHAR(7) NOT NULL,
    fecha_Creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_Actualizacion TIMESTAMP DEFAULT NULL
);
-- CUANDO ES ADMI NNO IMPORTA SI TIENE REGISTRO PREVIO EN LAS TABLAS (EMPLEADO O ALUMNO) PORQUE PUEDE VER TODO SIN ESTAR LIGADO AL DPI O CUI
-- id_usuario - ES EL CUI O DPI QUE LIGA AL USUARIO A SU REGISTRO DE LAS TABLAS (EMPLEADO O ALUMNO)
INSERT INTO t_Usuario(userName, pass, id_usuario, roleId) VALUES('melvin_pro','admin',null,'admin');
INSERT INTO t_Usuario(userName, pass, id_usuario, roleId) VALUES('admin','admin',null,'admin');
INSERT INTO t_Usuario(userName, pass, id_usuario, roleId) VALUES('prof','prof','EMP-321','prof');
INSERT INTO t_Usuario(userName, pass, id_usuario, roleId) VALUES('ING','ING','ING','prof');
INSERT INTO t_Usuario(userName, pass, id_usuario, roleId) VALUES('user','user','Alum1','user');
INSERT INTO t_Usuario(userName, pass, id_usuario, roleId) VALUES('7899','7899','7899','user');
INSERT INTO t_Usuario(userName, pass, id_usuario, roleId) VALUES('111','111','111','user');
INSERT INTO t_Usuario(userName, pass, id_usuario, roleId) VALUES('2','2','2','user');


--ROLES --
--admin - ADMINISTRADOR  - a la misma TABLA
--prof - PROFESOR - a la misma TABLA
--user - ALUMNO

--#endregion

--****PROFESORES****

--#region TABLA ANUNCIO Y TAREAS
/*PUBLICAR ANUNCIO O TAREA*/
CREATE TABLE t_Anuncio_Tarea(
    anuncio_Tarea_Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(8) NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    grado_Id INT NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    curso_Id INT NULL,
    punteo INT NULL,
    dpi_Empleado VARCHAR(20) NOT NULL,
    calificado VARCHAR(3) NULL,
    fecha_Creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_Entrega DATE NULL,
    fecha_Vencimiento DATE NULL,
    visibilidad_Publicacion VARCHAR(3) NULL,
    FOREIGN KEY (grado_Id) REFERENCES t_Grado(grado_Id),
    FOREIGN KEY (dpi_Empleado) REFERENCES t_Empleado(dpi_Empleado),
    FOREIGN KEY (curso_Id) REFERENCES t_Curso_Materia(curso_Id)
);


--#endregion 

--#region TABLA CALIFICAR TAREAS
CREATE TABLE t_Calificacion_Tarea(
    anuncio_Tarea_Id INT NOT NULL,
    cui_Alumno VARCHAR(20) NOT NULL,
    punteo_Tarea INT NOT NULL,
    observacion VARCHAR(250) NULL,
    fecha_Calificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (anuncio_Tarea_Id) REFERENCES t_Anuncio_Tarea(anuncio_Tarea_Id),
    FOREIGN KEY (cui_Alumno) REFERENCES t_Alumno(cui_Alumno)
);
--#endregion

--#region TABLA NOTAS FINALES
CREATE TABLE t_Nota_Final(
    cui_Alumno VARCHAR(20) NOT NULL,
    curso_Id INT NULL,
    punteo_Zona INT NOT NULL,
    punteo_Examen INT NOT NULL,
    punteo_Final INT NOT NULL,
    bimestre INT NOT NULL,
    fecha_Nota_Final TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cui_Alumno) REFERENCES t_Alumno(cui_Alumno),
    FOREIGN KEY (curso_Id) REFERENCES t_Curso_Materia(curso_Id)
);
--#endregion

--****ALUMNOS****

--#region TABLA ESTADOS COMPROBANTES DE PAGO APP
CREATE TABLE t_Estado(
    estado_Id INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL
);
INSERT INTO t_Estado VALUES(1,'PENDIENTE DE APROBACIÓN');
INSERT INTO t_Estado VALUES(2,'ACEPTADO');
INSERT INTO t_Estado VALUES(3,'RECHAZADO');
INSERT INTO t_Estado VALUES(4,'CANCELADO');
--#endregion

--#region TABLA ENVIOS DE COMPROBANTES DE PAGO APP
CREATE TABLE t_Comprobante_De_Pago(
    comprobante_Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cui_Alumno VARCHAR(20) NOT NULL,
    mes_Id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    img_Comprobante VARCHAR(999) NOT NULL,
    estado_Id INT NOT NULL,
    comentario_Respuesta VARCHAR(250) NULL,
    fecha_Envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_Respuesta TIMESTAMP DEFAULT NULL,
    fecha_Cancelado TIMESTAMP DEFAULT NULL,
    usuario_Respuesta VARCHAR(50) NULL,
    FOREIGN KEY (cui_Alumno) REFERENCES t_Alumno(cui_Alumno),
    FOREIGN KEY (mes_Id) REFERENCES t_Mes(mes_Id),
    FOREIGN KEY (estado_Id) REFERENCES t_Estado(estado_Id)
);
--#endregion




--C O O L
SELECT COUNT(1) AS coutSolventes
FROM t_Alumno A
LEFT JOIN t_Pago_Colegio PC
ON A.detalle_Ultimo_Pago = PC.pago_Id
WHERE IFNULL(PC.fecha_Pago,'2000-07-08') BETWEEN CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') AS DATE) AND LAST_DAY(NOW())
UNION ALL
SELECT COUNT(1)
FROM t_Alumno A
LEFT JOIN t_Pago_Colegio PC
ON A.detalle_Ultimo_Pago = PC.pago_Id
WHERE IFNULL(PC.fecha_Pago,'2000-07-08') NOT BETWEEN CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') AS DATE) AND LAST_DAY(NOW())
--C O O L









CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') AS DATE) AS 'PRIMER DIA DEL MES'
LAST_DAY(NOW()) AS 'ULTIMO DIA DEL MES'
MONTH(CURRENT_DATE()) AS 'MES ACTUAL'

--AQUI VAMOS




--AQUI VAMOS




SELECT C.nombre_Curso, IFNULL(N.punteo_Zona,NULL), IFNULL(N.punteo_Examen,NULL), IFNULL(N.punteo_Final,NULL)
FROM t_Curso_Materia C
LEFT JOIN t_Nota_Final N
ON C.curso_Id = N.curso_Id
WHERE N.bimestre = 1
AND N.cui_Alumno = '111'
AND C.curso_Id IN(
    SELECT curso_Id
    FROM t_Interseccion_Curso_Grado
    WHERE grado_Id = (SELECT grado_Id FROM t_Alumno WHERE cui_Alumno = '111')
);


SELECT C.nombre_Curso, N.punteo_Zona, N.punteo_Examen, N.punteo_Final
FROM t_Curso_Materia C
LEFT JOIN t_Nota_Final N
ON C.curso_Id = N.curso_Id
WHERE C.curso_Id IN(
    SELECT curso_Id
    FROM t_Interseccion_Curso_Grado
    WHERE grado_Id = (SELECT grado_Id FROM t_Alumno WHERE cui_Alumno = '1')
);







SELECT C.nombre_Curso, N.punteo_Zona, N.punteo_Examen, N.punteo_Final
FROM t_Interseccion_Curso_Grado I
LEFT JOIN t_Curso_Materia C
ON I.curso_Id = C.curso_Id
LEFT JOIN t_Nota_Final N
ON I.curso_Id = N.curso_Id
WHERE I.grado_Id = (SELECT grado_Id FROM t_Alumno WHERE cui_Alumno = '111')
AND N.bimestre = 1
AND N.cui_Alumno = '111';


--aqui vamos





