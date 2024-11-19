const express = require('express');
const router = express.Router();
const qrController = require('../controllers/asistenciaController');

router.post('/post-qr', qrController.guardarCodigoQR);  // Cambiamos la ruta para los QR

router.get('/get-qr', qrController.obtenerCodigosQR);   // Cambiamos la ruta para obtener los QR

module.exports = router;
