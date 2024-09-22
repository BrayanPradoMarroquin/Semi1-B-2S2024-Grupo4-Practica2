const query = require('../database/query');

// Crear album
// CALL sp_album(id_usuario, id_album, nombre_album, 'C'); -- Crear un album
const createAlbum = async (req, res) => {
    var user_id = req.params['id']
    const {nombre_album} = req.body;
    const [outcome] = await query.execute_('CALL sp_album(?, NULL, ?, \'C\');',[
        user_id,
        nombre_album
    ]);
    if (outcome.err){
        return res.status(400).json(outcome.err);
    }else{
        return res.status(200).json({"status":200,"message":"Album creado exitosamente"});
    }
}

// Obtener album
// CALL sp_album(id_usuario, id_album, nombre_album, 'R');
const getAlbum = async (req, res) => {
    var user_id = req.params['id']
    const [outcome] = await query.execute_('CALL sp_album(?, NULL, NULL, \'R\');',[
        user_id
    ]);
    if (outcome.err){
        return res.status(400).json(outcome.err);
    }else{
        return res.status(200).json(outcome[0]);
    }
}

// Editar album
// CALL sp_album(id_usuario, id_album, nombre_album, 'U');
const updateAlbum = async (req, res) => {
    var user_id = req.params['id']
    const {id_album, nombre_album} = req.body;
    const [outcome] = await query.execute_('CALL sp_album(?, ?, ?, \'U\');',[
        user_id,
        id_album,
        nombre_album
    ]);
    if (outcome.err){
        return res.status(400).json(outcome.err);
    }else{
        return res.status(200).json({"status":200,"message":"Album editado exitosamente"});
    }
}

// Eliminar album
// CALL sp_album(id_usuario, id_album, nombre_album, 'D');
const deleteAlbum = async (req, res) => {
    var user_id = req.params['id']
    const {id_album} = req.body;
    const [outcome] = await query.execute_('CALL sp_album(?, ?, NULL, \'D\');',[
        user_id,
        id_album
    ]);
    if (outcome.err){
        return res.status(400).json(outcome.err);
    }else{
        return res.status(200).json({"status":200,"message":"Album eliminado exitosamente"});
    }
}

module.exports = {
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAlbum
}