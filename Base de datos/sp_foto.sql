CREATE PROCEDURE sp_foto(
    IN p_id_usuario INT,
    IN p_id_album INT,
    IN p_id_foto INT,
    IN p_accion VARCHAR(1),
    IN p_nombre_foto VARCHAR(150),
    IN p_url_foto VARCHAR(500),
    OUT p_codigo INT,
    OUT p_mensaje VARCHAR(200)
)
BEGIN
    DECLARE next_foto_id INT;

    IF p_accion = 'C' THEN
        -- Agregar una nueva foto a un álbum
        SELECT COALESCE(MAX(id_foto) + 1, 1) INTO next_foto_id
        FROM foto
        WHERE id_usuario = p_id_usuario AND id_album = p_id_album;

        -- Agregar una nueva foto a un álbum
        INSERT INTO foto (id_usuario, id_album, id_foto, nombre_foto, url_foto)
        VALUES (p_id_usuario, p_id_album, next_foto_id, p_nombre_foto, p_url_foto);

        SET p_codigo = 0;
        SET p_mensaje = 'La operación de agregar una foto fue exitosa';
        
    ELSEIF p_accion = 'R' THEN
        -- Listar todas las fotos de un álbum que pertenecen a un usuario
        SELECT id_foto, nombre_foto, url_foto
        FROM foto
        WHERE id_usuario = p_id_usuario AND id_album = p_id_album;

        
    ELSEIF p_accion = 'D' THEN
        -- Eliminar una foto de un álbum perteneciente a un usuario
        DELETE FROM foto
        WHERE id_usuario = p_id_usuario AND id_album = p_id_album AND id_foto = p_id_foto;

        SET p_codigo = 0;
        SET p_mensaje = 'La operación de eliminar una foto fue exitosa';
        
    ELSEIF p_accion = 'U' THEN
        -- Actualizar el nombre y la URL de una foto en un álbum perteneciente a un usuario
        UPDATE foto
        SET nombre_foto = p_nombre_foto, url_foto = p_url_foto
        WHERE id_usuario = p_id_usuario AND id_album = p_id_album AND id_foto = p_id_foto;

        SET p_codigo = 0;
        SET p_mensaje = 'La operación de actualizar una foto fue exitosa';
        
    ELSE
        SET p_codigo = -1;
        SET p_mensaje = 'Acción no válida';
        
    END IF;
END;
