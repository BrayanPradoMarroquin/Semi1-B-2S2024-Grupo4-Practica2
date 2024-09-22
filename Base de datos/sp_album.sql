CREATE PROCEDURE sp_album(
    IN p_id_usuario INT,
    IN p_nombre_album VARCHAR(150),
    IN p_id_album INT,
    IN p_accion VARCHAR(1) -- Puede ser 'crear', 'listar', 'eliminar' o 'actualizar'
)
BEGIN
    DECLARE next_album_id INT;
    
    IF p_accion = 'C' THEN
        -- Obtener el próximo ID de álbum disponible para el usuario
        SELECT COALESCE(MAX(id_album) + 1, 1) INTO next_album_id
        FROM album
        WHERE id_usuario = p_id_usuario;
        
        -- Crear un nuevo álbum asociado a un usuario
        INSERT INTO album (id_usuario, id_album, nombre)
        VALUES (p_id_usuario, next_album_id, p_nombre_album);
        
    ELSEIF p_accion = 'R' THEN
        -- Listar todos los álbumes que pertenecen al usuario
        SELECT id_album, nombre
        FROM album
        WHERE id_usuario = p_id_usuario;
        
    ELSEIF p_accion = 'D' THEN
        -- Eliminar un álbum perteneciente a un usuario
        DELETE FROM foto
        WHERE id_usuario = p_id_usuario AND id_album = p_id_album AND id_foto = p_id_foto;

        DELETE FROM album
        WHERE id_usuario = p_id_usuario 
        AND id_album = p_id_album;
        
    ELSEIF p_accion = 'U' THEN
        -- Actualizar el nombre del álbum que pertenece a un usuario
        UPDATE album
        SET nombre = p_nombre_album
        WHERE id_usuario = p_id_usuario 
        AND id_album = p_id_album;
        
    ELSE
        SELECT 'Acción no válida';
        
    END IF;
END;