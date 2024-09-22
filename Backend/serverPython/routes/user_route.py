from flask import Blueprint, request

from serverPython.controller.user_controller import getProfile

usuario_bp = Blueprint('/perfil', __name__)

usuario_bp.add_url_rule('/<id>', 'perfil', getProfile, methods=['GET'])