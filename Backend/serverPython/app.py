from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from serverPython.routes.index_routes import index_bp
from serverPython.routes.user_route import usuario_bp
from serverPython.routes.photo_routes import photo_bp
from serverPython.routes.album_routes import album_bp

app.register_blueprint(album_bp)
app.register_blueprint(photo_bp)
app.register_blueprint(index_bp)