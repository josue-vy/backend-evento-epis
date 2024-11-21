const { poolPromise } = require('../database/database');

async function guardarCodigoQR(req, res) {
    try {
        const { codigoQR } = req.body;  // Solo obtenemos 'codigoQR'

        // Verificación del campo codigoQR
        if (!codigoQR) {
            return res.status(400).json({ error: 'Falta el campo codigoQR' });
        }

        const pool = await poolPromise;
        const fecha = new Date();  // Obtenemos la fecha y hora actuales

        // Verificar conexión antes de hacer la consulta
        console.log('Conectando a la base de datos...');

        // Insertamos solo el codigoQR y la fecha
        const result = await pool.request()
            .input('codigoQR', codigoQR)
            .input('fecha', fecha)
            .query('INSERT INTO codigos_qr (codigoQR, fecha) VALUES (@codigoQR, @fecha)');

        console.log('Código QR guardado correctamente:', result);  // Para depuración

        res.status(201).json({ message: 'Código QR guardado correctamente' });
    } catch (error) {
        console.error('Error al guardar el código QR:', error);
        
        // Diferenciar los errores SQL si es necesario
        if (error.message.includes('request')) {
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        res.status(500).json({ error: 'Error al guardar el código QR' });
    }
}

async function obtenerCodigosQR(req, res) {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM codigos_qr');

        console.log('Códigos QR obtenidos:', result.recordset);  // Para depuración

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
