import logging
import boto3
from botocore.exceptions import ClientError
import os
import base64

# aqui tambien os.environ['AWS_ACCESS_KEY_ID']
# aqui van las claves os.environ['AWS_SECRET_ACCESS_KEY']
os.environ['AWS_ACCESS_KEY_ID'] = 'AKIAZMBSHQXGVXKNFOXA'
os.environ['AWS_SECRET_ACCESS_KEY'] = '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'

def upload_file(picture, nombre, usuario):
    pictureName = "Fotos_Perfil/" + usuario + nombre + ".jpg"
    

    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """
    # Decodificar los datos de la imagen base64
    image_data = base64.b64decode(picture)

    # Subir la imagen a S3
    s3 = boto3.client('s3')
    try:
        s3.put_object(Bucket="practica2-semi1-b-2s2024-imageness-g4", 
                      Key=pictureName, 
                      Body=image_data,
                      ContentType= 'image')
        return True
    except ClientError as e:
        print("Error al subir el archivo a S3:", e)
        return False