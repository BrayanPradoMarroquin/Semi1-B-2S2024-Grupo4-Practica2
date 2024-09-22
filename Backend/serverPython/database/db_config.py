import os
from dotenv import load_dotenv
load_dotenv()

# user=os.getenv("DB_USER")
# password=os.getenv("DB_PASSWORD")
# host=os.getenv("DB_HOST")
# port=os.getenv("DB_PORT")
# database=os.getenv("DB_NAME")

user='admin'
password='*Semi1_Practica1*'
host='bdpractica1.cp842gwg2jsl.us-east-1.rds.amazonaws.com'
database='BDSemiPractica2'
port='3306'


db_config = {
    'user': user,
    'password': password,
    'host': host,
    'database': database,
    'port': port,
    'raise_on_warnings': True
}
