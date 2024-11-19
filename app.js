require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const qrRoutes = require('./routes/asistenciaRoute');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/backend', qrRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
