var aws = require("aws-sdk");
const { DatabaseError } = require("pg");
require("dotenv").config();

const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadPicture = async (picture, nombre, usuario) => {
  var pictureName = "fotos/" + usuario + nombre + ".jpg";
  let buffer = new Buffer.from(picture, "base64");

  const params = {
    Bucket: "practica2-g4-imagenes",
    Key: pictureName,
    Body: buffer,
    ContentType: "image",
  };

  const result = s3.putObject(params).promise();
  console.log(result);
};

const getPicture = async (nombre, usuario) => {
  var pictureName = "fotos/" + usuario + nombre + ".jpg";

  const getparams = {
    Bucket: "practica2-g4-imagenes",
    Key: pictureName,
  };

  s3.getObject(getparams),
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var dataBase64 = Buffer.from(data.body).toString("base64");
        return dataBase64;
      }
    };
};

module.exports = {
  s3,
  uploadPicture,
  getPicture,
};
