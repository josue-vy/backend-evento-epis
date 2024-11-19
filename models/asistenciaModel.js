const db = require('../database/database');  // Importamos la conexión a la base de datos

module.exports = {
    guardarCodigoQR: async function (codigoQR) {
        try {
            const fecha = new Date();  // Obtenemos la fecha y hora actuales
            const sql = 'INSERT INTO codigos_qr (codigoQR, fecha) VALUES (?, ?)';
            const result = await db.execute(sql, [codigoQR, fecha]);
            return result;  // Retornamos el resultado de la inserción
        } catch (error) {
            throw error;  // En caso de error, lo lanzamos
        }
    },

    obtenerCodigosQR: async function () {
        try {
            const sql = 'SELECT * FROM codigos_qr';
            const [rows, fields] = await db.execute(sql);
            return rows;  // Retornamos los resultados obtenidos
        } catch (error) {
            throw error;  // En caso de error, lo lanzamos
        }
    }
};
