from flask import request
from database.db import get_db_conn
import json

def createAlbum(id):
    # user, name, password, url
    data = request.json
    nombre_album = data.get('nombre_album')

    query = f"CALL sp_album({id}, NULL, '{nombre_album}', 'C');"
    print(query)

    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query)
        cursor.close()
        db_conn.close()
        return {"status":200,"mensaje":'Album creado exitosamente.'}
    except Exception as error: 
        print(error)
        return {"status":400,"mensaje":"Error al crear el album"}
    
def getAlbum(id):
    #query = f"CALL sp_album({id}, NULL, NULL, 'R');"
    query = f"SELECT id_album, nombre FROM album WHERE id_usuario = {id};"

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
        data = [{"id_album": row[0], "nombre": row[1]} for row in result_sets]

        # Convert data to JSON format
        json_data = json.dumps(data, indent=4)
        print(json_data)
        return json_data
    except Exception as error: 
        print(error)
        return {"status":400,"mensaje":"No se pudo obtener la informacion."}
    
def updateAlbum(id):
    # id_album, nombre_album
    data = request.json
    id_album = data.get('id_album')
    nombre_album = data.get('nombre_album')

    query = f"CALL sp_album({id}, {id_album}, '{nombre_album}', 'U');"

    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query)
        cursor.close()
        db_conn.close()
        return {"status": 200, "mensaje": 'Datos actualizados.'}
    except Exception as error: 
        print(error)
        return {"status": 400, "mensaje": "Datos no actualizados"}
    
def deleteAlbum(id):
    data = request.json
    id_album = data.get('id_album')

    query = f"CALL sp_album({id}, {id_album}, NULL, 'D');"

    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query)
        cursor.close()
        db_conn.close()
        return {"status": 200, "mensaje": 'Album eliminado.'}
    except Exception as error: 
        print(error)
        return {"status": 400, "mensaje": "No se ha podido eliminar el album."}