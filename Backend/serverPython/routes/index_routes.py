from flask import Blueprint, request

from serverPython.controller.user_controller import register
from serverPython.controller.user_controller import login
from serverPython.controller.user_controller import getProfile
from serverPython.controller.user_controller import editProfile
from serverPython.controller.user_controller import index

index_bp = Blueprint('/', __name__)

index_bp.add_url_rule('/registro', 'registro', register, methods=['POST'])
index_bp.add_url_rule('/login', 'login', login, methods=['POST'])
index_bp.add_url_rule('/perfil/<id>', 'perfil', getProfile, methods=['GET'])
index_bp.add_url_rule('/perfil/<id>', 'perfilPut', editProfile, methods=['PUT'])
index_bp.add_url_rule('/', 'index', index, methods=['GET'])
