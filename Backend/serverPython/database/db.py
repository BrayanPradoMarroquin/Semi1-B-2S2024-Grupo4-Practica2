from mysql.connector import pooling
from mysql.connector import connect
# from database.db_config import db_config


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


cnxpool = pooling.MySQLConnectionPool(pool_name = "connection", pool_size = 10, autocommit=True, **db_config)

def get_db_conn():
    return cnxpool.get_connection()