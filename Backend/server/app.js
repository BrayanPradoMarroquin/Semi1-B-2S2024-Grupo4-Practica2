const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express ();

//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '100mb' }));

//imports rutas
const userRoutes = require("./routes/user.routes.js")
const photosRoutes = require("./routes/photo.routes.js")
const albumRoutes = require("./routes/album.routes.js")

app.use("/", userRoutes);
app.use("/foto", photosRoutes);
app.use("/album", albumRoutes);

app.get('/', (req, res) => {
    res.status(200).json({message: "OK"});
});

module.exports = app;