const express = require('express');
const router = express.Router();
const { validarQR } = require('../controllers/qrController'); // Importar el controlador

// Ruta para validar el código QR
router.post('/validar-qr', async (req, res) => {
    try {
        // Llamamos a la función validarQR pasando el req y res correctamente
        await validarQR(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error al validar QR' });
    }
});

module.exports = router;
