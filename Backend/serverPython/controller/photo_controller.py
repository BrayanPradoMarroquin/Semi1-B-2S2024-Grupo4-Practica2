import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import request
from serverPython.database.db import get_db_conn
import json
from serverPython.s3.s3 import upload_file

def uploadPicture(id):
    # nombre_foto, album, foto
    data = request.json
    nombre_foto = data.get('nombre_foto')
    album = data.get('album')
    foto = data.get('foto')
    url_foto = ""

    print(id, nombre_foto, album, foto)

    # Primero obtener el nombre del usuario
    query = f"SELECT id_usuario, usuario FROM usuario WHERE id_usuario = {id};"
    print(query)

    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query)

        # Fetch all result sets returned by the stored procedure
        result = cursor.fetchone()
        
        cursor.close()
        db_conn.close()

        nombre_usuario = result[1]
    except Exception as error: 
        print(error)
        return {"status": 400, "mensaje": "Datos no encontrados"}
    
    # con el nombre de usuario, asignar nombre a la foto
    url_foto = "https://practica2-g4-imagenes.s3.us-east-2.amazonaws.com/" + "Fotos_Publicadas/" + nombre_usuario + nombre_foto + ".jpg"

    # Subir al bucket S3
    # upload_file(foto, nombre_foto, nombre_usuario)

    query = f"CALL sp_foto({id}, '{album}', NULL, 'C', '{nombre_foto}', '{url_foto}', @codigo, @mensaje);"
    print(query)

    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query)

        # por ultimo, obtener los valores de codigo y mensaje
        cursor.execute("SELECT @codigo, @mensaje;")
        result = cursor.fetchone()
        codigo = result[0]
        mensaje = result[1]

        cursor.close()
        db_conn.close()
        return {"codigo": codigo, "mensaje": mensaje}
    except Exception as error: 
        print(error)
        return {"status": 400, "mensaje": "Error al subir la foto"}
    

def getPhotos(id):
    data = request.json
    id_album = data.get('id_album')

    #query = f"CALL sp_foto({id}, {id_album}, NULL, 'R', NULL , NULL , @codigo, @mensaje);"
    query = f"SELECT id_foto, nombre_foto, url_foto FROM foto WHERE id_usuario = {id} AND id_album = {id_album};"

    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query)

        # Fetch all result sets returned by the stored procedure
        result_sets = cursor.fetchall()
        print("result sets: ", result_sets)
        
        cursor.close()
        db_conn.close()

        # Convert result_sets to a list of dictionaries
        data = [{"id_foto": row[0], "nombre_foto": row[1], "url_foto": row[2]} for row in result_sets]

        # Convert data to JSON format
        json_data = json.dumps(data, indent=4)

        return json_data
    except Exception as error: 
        print(error)
        return {"status":400,"mensaje":"No se pudo obtener la informacion."}