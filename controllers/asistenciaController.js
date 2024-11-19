const { poolPromise } = require('../database/database');

async function guardarCodigoQR(req, res) {
    try {
        const { codigoQR } = req.body;  // Solo obtenemos 'codigoQR' (sin 'comentario')
        const pool = await poolPromise;
        const fecha = new Date();  // Obtenemos la fecha y hora actuales
        
        // Insertamos solo el codigoQR y la fecha
        await pool.request()
            .input('codigoQR', codigoQR)
            .input('fecha', fecha)
            .query('INSERT INTO codigos_qr (codigoQR, fecha) VALUES (@codigoQR, @fecha)');
        
        res.status(201).json({ message: 'Código QR guardado correctamente' });
    } catch (error) {
        console.error('Error al guardar el código QR:', error);
        res.status(500).json({ error: 'Error al guardar el código QR' });
    }
}

async function obtenerCodigosQR(req, res) {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM codigos_qr');
        
        res.status(200).json(result.recordset);  // Devuelve los códigos QR en formato JSON
    } catch (error) {
        console.error('Error al obtener los códigos QR:', error);
        res.status(500).json({ error: 'Error al obtener los códigos QR' });
    }
}

module.exports = {
    guardarCodigoQR,
    obtenerCodigosQR
};
