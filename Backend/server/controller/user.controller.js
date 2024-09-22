const query = require("../database/query");
const md5 = require("md5");
const s3 = require("../s3/s3");

const index = async (req, res) => {
  res.status(200).json({ message: "OK en index controller" });
};

// Login
// call practica1.sp_usuario(@mensaje, id_usuario, usuario, nombre_completo, password, url_foto, 'L');
// call practica1.sp_usuario(@mensaje, NULL, 'Usuario1', NULL, 'PWD', NULL, 'L');
const login = async (req, res) => {
  try {
    const { user, password } = req.body;

    // Validar que user y password están presentes
    if (!user || !password) {
      return res.status(400).json({
        status: 400,
        mensaje: "Usuario y contraseña son requeridos.",
      });
    }

    const pass = md5(password);
    console.log("password: " + password);
    console.log("pass: " + pass);

    // Ejecutar la consulta
    const [outcome] = await query.execute_(
      "call sp_usuario(@mensaje, NULL, ?, NULL, ?, NULL, 'L');",
      [user, pass]
    );

    // Manejo de errores en la respuesta
    if (outcome.err) {
      return res.status(400).json(outcome.err);
    } else {
      if (outcome[0][0]["p_id_usuario"]) {
        return res.status(200).json({
          status: 200,
          mensaje: "Credenciales correctas.",
          id_usuario: outcome[0][0]["p_id_usuario"],
        });
      } else {
        return res.status(401).json({
          status: 401,
          mensaje: "Credenciales incorrectas.",
        });
      }
    }
  } catch (error) {
    // Manejo de errores inesperados
    console.error("Error en el login: ", error);
    return res.status(500).json({
      status: 500,
      mensaje: "Error interno del servidor.",
    });
  }
};

// Registro
// CALL sp_usuario(@id, @mensaje, 'Usuario', 'Nombre', 'Password', 'URL', 'C');
const register = async (req, res) => {
  const { user, name, password, url } = req.body;
  nombre_foto = "FotoDePerfil1";

  let url_foto =
    "https://practica2-g4-imagenes.s3.us-east-2.amazonaws.com/" +
    "fotos/" +
    user +
    nombre_foto +
    ".jpg";

  // BUCKET S3
  //   s3.uploadPicture(url, nombre_foto, user);

  const pass = md5(password);
  console.log("pass " + pass);
  const [outcome] = await query.execute_(
    "call sp_usuario(@mensaje, NULL, ?, ?, ?, ?, 'C'); SELECT @mensaje;",
    [user, name, pass, url_foto]
  );
  if (outcome.err) {
    return res.status(400).json(outcome.err);
  } else {
    //return res.status(200).json(outcome[1][0]);
    return res
      .status(200)
      .json({ status: 200, mensaje: outcome[1][0]["@mensaje"] });
  }
};

// Obtener Perfil
// ID obtenido en el URL
// CALL sp_usuario(@id, @mensaje, 'Usuario', 'Nombre', 'Password', 'URL', 'R');
const getProfile = async (req, res) => {
  var user_id = req.params["id"];
  console.log("user id: " + user_id);
  let user = "user";
  let name = "name";
  let pass = "passs";
  let url = "default";
  await query.execute_("set @id = ?;", [user_id]);
  const outcome = await query.execute_(
    "call sp_usuario(@mensaje, @id, ?, ?, ?, ?, 'R');",
    [user, name, pass, url]
  );
  if (outcome.err) {
    return res.status(400).json(outcome.err);
  } else {
    return res.status(200).json(outcome[0][0][0]);
  }
};

// Editar Perfil
// ID obtenido en el URL
// CALL sp_usuario(@mensaje, id, 'Usuario', 'Nombre', 'Password', 'URL', 'U');
const editProfile = async (req, res) => {
  var user_id = req.params["id"];
  const { user, name, password, url } = req.body;
  const pass = md5(password);

  //verificar si la contrase;a es correcta
  const [outcomePassword] = await query.execute_(
    "call sp_usuario(@mensaje, NULL, ?, NULL, ?, NULL, 'L');",
    [user, pass]
  );
  if (!outcomePassword[0][0]["p_id_usuario"]) {
    return res.status(401).json({
      status: 401,
      mensaje: "Contraseña incorrecta. No se han actualizado los datos.",
    });
  }

  const outcome = await query.execute_(
    "call sp_usuario(@mensaje, ?, ?, ?, ?, ?, 'U'); SELECT @mensaje;",
    [user_id, user, name, pass, url]
  );

  if (outcome.err) {
    return res.status(400).json({ status: 400, mensaje: outcome.err });
  } else {
    return res
      .status(200)
      .json({ status: 200, mensaje: outcome[0][1][0]["@mensaje"] });
  }
};

module.exports = {
  index,
  login,
  register,
  getProfile,
  editProfile,
};
