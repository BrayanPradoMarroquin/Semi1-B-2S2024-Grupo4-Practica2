from flask import request
import hashlib
from serverPython.database.db import get_db_conn
import json
from serverPython.s3.s3 import upload_file

def index():
    return {"status":200,"mensaje":"okay en python"}

def login():
    # user, password
    data = request.json
    user = data.get('user')
    password = hashlib.md5(data.get('password').encode()).hexdigest()
    print(user, password)

    # query = f"call sp_usuario(@mensaje, NULL, '{user}', NULL, '{password}', NULL, 'L');"
    
    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query, multi=True)
    except Exception as error: 
        print()
    
    try:
        
        
        
        # obtener user id
        query = f"SELECT id_usuario FROM usuario WHERE usuario = '{user}' AND clave = '{password}';"
        # print("print ",data)
        cursor.execute(query)
        
        result_sets = cursor.fetchone()
        id_usuario = result_sets[0]
        print(id_usuario)

        cursor.close()
        db_conn.close()

        if id_usuario:
            return {"status":200,"mensaje":'Datos de autenticacion correctos.', "id_usuario":id_usuario}
        return {"status":401,"mensaje":"Credenciales incorrectos."}
    except Exception as error: 
        print(error)
        return {"status":400,"mensaje":"Datos de autenticacion incorrectos"}

# CALL sp_usuario(@mensaje, id, 'Usuario', 'Nombre', 'Password', 'URL', 'C');
def register():
    # user, name, password, url
    data = request.json
    user = data.get('user')
    name = data.get('name')
    password = hashlib.md5(data.get('password').encode()).hexdigest()
    url = data.get('url') # foto recibida

    nombre_foto = "FotoDePerfil1"
    # con el nombre de usuario, asignar nombre a la foto
    url_foto = "https://practica2-semi1-b-2s2024-imageness-g4.s3.amazonaws.com/" + "Fotos_Perfil/" + user + nombre_foto + ".jpg"

    # Subir al bucket S3
    # upload_file(url, nombre_foto, user)

    print(user, name, password, url)
    query = f"call sp_usuario(@mensaje, NULL, '{user}', '{name}', '{password}', '{url_foto}', 'C');"
    print(query)

    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query)
        cursor.close()
        db_conn.close()
        return {"status":200,"mensaje":'Usuario registrado correctamente.'}
    except Exception as error: 
        print(error)
        return {"status":400,"mensaje":"error"}
    
def getProfile(id):
    # user, password
    print("id: ", id)
    #query = f"call sp_usuario(@mensaje, {id}, NULL, NULL, NULL, NULL, 'R');"
    query = f"SELECT id_usuario, usuario, nombre_completo, clave, url_foto FROM usuario WHERE id_usuario = {id};"
    print(query)

    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query)

        # Fetch all result sets returned by the stored procedure
        result_sets = cursor.fetchall()
        
        cursor.close()
        db_conn.close()

         # Convert result_sets to a list of dictionaries
        data = [{"id_usuario": row[0], "usuario": row[1], "nombre_completo": row[2], "clave": row[3], "url_foto": row[4]} for row in result_sets]

        # Convert data to JSON format
        json_data = json.dumps(data[0], indent=4)

        return json_data
    except Exception as error: 
        print(error)
        return {"status": 400, "mensaje": "Datos no encontrados"}

def editProfile(id):
    data = request.json
    user = data.get('user')
    name = data.get('name')
    password = hashlib.md5(data.get('password').encode()).hexdigest()
    url = data.get('url')

    # parametrizado porque por algun motivo solo asi funciono aqui PERO EN OTROS NO FUNCIONO >:c
    query = "CALL sp_usuario(@mensaje, %s, %s, %s, %s, %s, 'U')"
    query_params = (id, user, name, password, url)

    db_conn = get_db_conn()
    try:
        cursor = db_conn.cursor()
        cursor.execute(query, query_params)
        cursor.close()
        db_conn.close()
        return {"status": 200, "mensaje": 'Datos actualizados.'}
    except Exception as error: 
        print(error)
        return {"status": 400, "mensaje": "Datos no actualizados"}