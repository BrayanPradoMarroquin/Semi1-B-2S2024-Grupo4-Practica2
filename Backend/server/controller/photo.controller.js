const query = require("../database/query");
const s3 = require("../s3/s3");

// Subir Foto
// CALL sp_foto(id_usuario, id_album, id_foto=NULL, 'C', 'nombre_foto', 'url', @codigo, @mensaje);
const uploadPicture = async (req, res) => {
  var user_id = req.params["id"];
  const { nombre_foto, album, foto } = req.body;
  let nombre_usuario;

  //obtener nombre de usuario
  const datos = await query.execute_(
    "call sp_usuario(@mensaje, ?, NULL, NULL, NULL, NULL, 'R');",
    [user_id]
  );
  if (datos.err) {
    return res.status(400).json(datos.err);
  } else {
    nombre_usuario = datos[0][0][0]["p_usuario"];
    console.log(nombre_usuario);
  }

  let url_foto =
    "https://practica2-g4-imagenes.s3.us-east-2.amazonaws.com/" +
    "fotos/" +
    nombre_usuario +
    nombre_foto +
    ".jpg";

  // BUCKET S3
  s3.uploadPicture(foto, nombre_foto, nombre_usuario);

  const [outcome] = await query.execute_(
    "CALL sp_foto(?, ?, NULL, 'C', ?, ?, @codigo, @mensaje); select @codigo, @mensaje;",
    [user_id, album, nombre_foto, url_foto]
  );
  console.log(url_foto);
  if (outcome.err) {
    return res.status(400).json(outcome.err);
  } else {
    return res
      .status(200)
      .json({
        codigo: outcome[1][0]["@codigo"],
        mensaje: outcome[1][0]["@mensaje"],
      });
  }
};

// Ver fotos de un album
// CALL practica1.sp_foto(id_usuario, id_album, id_foto, 'R', nombre_foto , url_foto , @codigo, @mensaje);
// CALL practica1.sp_foto(1, 1, NULL, 'R', NULL , NULL , ?, ?);
const getPhotos = async (req, res) => {
  var user_id = req.params["id"];
  const { id_album } = req.body;
  const [outcome] = await query.execute_(
    "CALL sp_foto(?, ?, NULL, 'R', NULL , NULL , @codigo, @mensaje);",
    [user_id, id_album]
  );
  if (outcome.err) {
    return res.status(400).json(outcome.err);
  } else {
    return res.status(200).json(outcome[0]);
  }
};

module.exports = {
  uploadPicture,
  getPhotos,
};
