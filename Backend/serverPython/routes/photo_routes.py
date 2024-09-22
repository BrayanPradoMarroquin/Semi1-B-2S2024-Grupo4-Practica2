from flask import Blueprint, request

from serverPython.controller.photo_controller import uploadPicture
from serverPython.controller.photo_controller import getPhotos

photo_bp = Blueprint('foto', __name__, url_prefix='/foto')

photo_bp.add_url_rule('/subir/<id>', 'subirFoto', uploadPicture, methods=['POST'])
photo_bp.add_url_rule('/obtener/<id>', 'obtenerFoto', getPhotos, methods=['POST'])
