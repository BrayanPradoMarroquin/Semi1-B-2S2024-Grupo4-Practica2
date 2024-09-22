
-- Table usuario
CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  usuario VARCHAR(50) NOT NULL,
  nombre_completo VARCHAR(300) NOT NULL,
  clave VARCHAR(150) NOT NULL,
  url_foto VARCHAR(500),
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uk_usuario (usuario)
) ;

-- Table album
CREATE TABLE album (
  id_usuario INT NOT NULL,
  id_album INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  PRIMARY KEY (id_usuario, id_album),
  CONSTRAINT fk_usuario_album FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
);

-- Table foto
CREATE TABLE foto (
  id_usuario INT NOT NULL,
  id_album INT NOT NULL,
  id_foto INT NOT NULL AUTO_INCREMENT,
  nombre_foto VARCHAR(150) NOT NULL,
  url_foto VARCHAR(500) NOT NULL,
  PRIMARY KEY (id_foto, id_usuario, id_album),
  CONSTRAINT fk_album_foto FOREIGN KEY (id_usuario, id_album) REFERENCES album (id_usuario, id_album)
);

-- Table Parametro
CREATE TABLE parametro (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(10) NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  valor VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);
