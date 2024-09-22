
CREATE PROCEDURE BDSemiPractica2.sp_usuario(
    OUT p_mensaje VARCHAR(100),
    IN p_id_usuario INT,
    IN p_usuario VARCHAR(50),
    IN p_nombre_completo VARCHAR(300),
    IN p_clave VARCHAR(150),
    IN p_url_foto VARCHAR(500),
    IN p_operacion CHAR(1) -- C: Create, R: Read, U: Update, D: Delete
)
BEGIN
    DECLARE v_id_album INT;
    DECLARE v_id_foto INT;

    IF p_operacion = 'C' THEN
        -- CREATE
        IF NOT EXISTS(SELECT 1 FROM BDSemiPractica2.usuario WHERE usuario = p_usuario) THEN
            INSERT INTO BDSemiPractica2.usuario(usuario, nombre_completo, clave, url_foto)
            VALUES (p_usuario, p_nombre_completo, p_clave, p_url_foto);
            SET p_id_usuario = LAST_INSERT_ID();

            INSERT INTO BDSemiPractica2.album(id_usuario, id_album, nombre)
            VALUES(p_id_usuario, 0, 'Fotos de perfil');
            
            INSERT INTO BDSemiPractica2.foto (id_usuario, id_album, id_foto, nombre_foto, url_foto)
            VALUES(p_id_usuario, 0, 0, 'Foto de perfil', p_url_foto);
            
            SET p_mensaje := 'Se creó el usuario correctamente';
        ELSE
            SET p_id_usuario := NULL;
            SET p_mensaje := 'El nombre usuario ya existe en la base de datos';
        END IF;
    ELSEIF p_operacion = 'R' THEN
        -- READ
        SELECT id_usuario, usuario, nombre_completo, clave, url_foto
        INTO p_id_usuario, p_usuario, p_nombre_completo, p_clave, p_url_foto
        FROM BDSemiPractica2.usuario
        WHERE id_usuario = p_id_usuario;
        SELECT p_id_usuario, p_usuario, p_nombre_completo, p_url_foto;
    ELSEIF p_operacion = 'L' THEN
        SELECT id_usuario, usuario, nombre_completo, clave, url_foto
        INTO p_id_usuario
        FROM BDSemiPractica2.usuario
        WHERE usuario = p_usuario
        AND clave = p_clave;
    ELSEIF p_operacion = 'U' THEN
        -- UPDATE
        UPDATE BDSemiPractica2.usuario
        SET usuario = p_usuario,
            nombre_completo = p_nombre_completo,
            clave = p_clave,
            url_foto = p_url_foto
        WHERE id_usuario = p_id_usuario;
        SET p_mensaje := 'Se actualizó el usuario correctamente';
    ELSEIF p_operacion = 'D' THEN
        -- DELETE
        DELETE FROM BDSemiPractica2.usuario WHERE id_usuario = p_id_usuario;
        SET p_mensaje := 'Se eliminó el usuario correctamente';
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operación no válida. Use C para Create, R para Read, U para Update, D para Delete';
    END IF;

END;
