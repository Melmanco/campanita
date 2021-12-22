CREATE DATABASE campanita;
USE campanita;
CREATE TABLE Usuario (
	RUT int NOT NULL PRIMARY KEY,
	Nombre varchar(60) NOT NULL,
	Perfil SET('Directora','Docente','Estudiante') NOT NUlL,
	Contraseña varchar(20) NOT NULL,
	Email varchar(40)
);

CREATE TABLE Mensaje (
	ID_Mensaje int NOT NULL PRIMARY KEY,
	ID_Remitente int NOT NULL,
	ID_Destinatario int NOT NULL,
	Contenido varchar(2000) NOT NULL,
	Fecha DATETIME NOT NULL,
	FOREIGN KEY (ID_Remitente) REFERENCES Usuario(RUT),
	FOREIGN KEY (ID_Destinatario) REFERENCES Usuario(RUT)
);

CREATE TABLE Grupo (
	ID_Grupo int NOT NULL PRIMARY KEY,
	Nombre varchar(40) NOT NULL
);

CREATE TABLE Contiene (
	ID_Grupo int NOT NULL,
	RUT int NOT NULL,
	FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo),
	FOREIGN KEY (RUT) REFERENCES Usuario(RUT)
);

CREATE TABLE Anuncio (
	ID_Anuncio int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title varchar(2000) NOT NULL,
	start date NOT NULL,
	end Date NOT NULL
);


CREATE TABLE Recibe (
	ID_Grupo int NOT NULL,
	ID_Anuncio int NOT NULL,
	FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo),
	FOREIGN KEY (ID_Anuncio) REFERENCES Anuncio(ID_Anuncio)
);

CREATE TABLE Evento (
	ID_Evento int NOT NULL PRIMARY KEY,
	Descripcion varchar(2000) NOT NULL,
	Fecha DATETIME NOT NULL
);

CREATE TABLE Agenda (
	ID_Grupo int NOT NULL,
	ID_Evento int NOT NULL,
	FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo),
	FOREIGN KEY (ID_Evento) REFERENCES Evento(ID_Evento)
);

CREATE TABLE Clase (
	ID_Clase int NOT NULL PRIMARY KEY,
	Titulo varchar(60) NOT NULL,
	Fecha DATETIME NOT NULL,
	Link varchar(120) NOT NULL
);

CREATE TABLE Asiste (
	ID_Grupo int NOT NULL,
	ID_Clase int NOT NULL,
	FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo),
	FOREIGN KEY (ID_Clase) REFERENCES Clase(ID_Clase)
);

CREATE TABLE Documento (
	ID_Documento int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	Ruta varchar(120) NOT NULL,
	Fecha DATETIME NOT NULL
);

CREATE TABLE Descarga (
	ID_Grupo int NOT NULL,
	ID_Documento int NOT NULL AUTO_INCREMENT,
	FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo),
	FOREIGN KEY (ID_Documento) REFERENCES Documento(ID_Documento)
);
