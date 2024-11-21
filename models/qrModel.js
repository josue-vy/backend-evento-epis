const { poolPromise, sql } = require('../database/database'); // Asegúrate de tener configurada la conexión

// Modelo para la tabla Asistencia_Validacion
const AsistenciaValidacion = {
    async crearAsistenciaValidada(usuarioId, tipoAsistencia, estadoAsistencia, asistenciaPrincipalId) {
        try {
            const pool = await poolPromise;
            const fechaCreacion = new Date();

            // Insertar la validación en la tabla Asistencia_Validacion
            const result = await pool.request()
            .input('usuarioId', sql.Int, usuarioId)
            .input('tipoAsistencia', sql.Int, tipoAsistencia)
            .input('estadoAsistencia', sql.Int, estadoAsistencia)
            .input('fechaCreacion', sql.DateTime, fechaCreacion)
            .input('asistenciaPrincipalId', sql.Int, asistenciaPrincipalId)
            .query(`
                INSERT INTO Asistencia_Validacion 
                (Asi_Id_Usuario, Asi_Id_Tipo, AsiPri_Id_Estado, Asi_Creacion, Asi_Id_AsisPrincipal)
                VALUES (@usuarioId, @tipoAsistencia, @estadoAsistencia, @fechaCreacion, @asistenciaPrincipalId)
            `);
        

            return result; // Retorna el resultado de la inserción
        } catch (error) {
            console.error('Error al crear la validación de asistencia:', error);
            throw error;
        }
    },
    
    async verificarCodigoQR(qrCodigo) {
        try {
            const pool = await poolPromise;

            // Consultar la existencia del código QR en la tabla Asistencia_Principal
            const result = await pool.request()
                .input('qrCodigo', sql.NVarChar, qrCodigo)
                .query(`
                    SELECT AsiPri_Id 
                    FROM Asistencia_Principal 
                    WHERE AsiPri_Codigo = @qrCodigo
                `);

            return result.recordset[0] || null; // Devuelve el primer registro o null si no se encuentra
        } catch (error) {
            console.error('Error al verificar el código QR:', error);
            throw error;
        }
    }
};

module.exports = AsistenciaValidacion;
