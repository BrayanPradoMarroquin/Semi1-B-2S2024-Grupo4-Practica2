from flask import Blueprint, request

from serverPython.controller.album_controller import createAlbum
from serverPython.controller.album_controller import getAlbum
from serverPython.controller.album_controller import updateAlbum
from serverPython.controller.album_controller import deleteAlbum

album_bp = Blueprint('album', __name__, url_prefix='/album')

album_bp.add_url_rule('/crear/<id>', 'crearAlbum', createAlbum, methods=['POST'])
album_bp.add_url_rule('/obtener/<id>', 'getAlbum', getAlbum, methods=['GET'])
album_bp.add_url_rule('/editar/<id>', 'updateAlbum', updateAlbum, methods=['POST'])
album_bp.add_url_rule('/eliminar/<id>', 'deleteAlbum', deleteAlbum, methods=['POST'])
