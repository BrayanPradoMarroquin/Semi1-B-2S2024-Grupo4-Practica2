import os
from dotenv import load_dotenv
load_dotenv()

region = os.getenv('AWS_REGION')
access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
bucket = os.getenv('AWS_BUCKET_NAME')