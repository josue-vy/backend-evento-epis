const AsistenciaValidacion = require('../models/qrModel'); // Asegúrate de tener el modelo correcto

const validarQR = async (req, res) => {
    try {
        const { qrCodigo } = req.body;  // El código QR escaneado
        const { id: usuarioId } = req.session.user || {}; // El ID del usuario logueado
        
        // Validar que se haya enviado el código QR
        if (!qrCodigo) {
            return res.status(400).json({ message: 'El código QR es necesario' });
        }
        
        // Validar que el usuario esté autenticado
        if (!usuarioId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Verificar si el código QR escaneado existe en la tabla Asistencia_Principal
        const asistenciaPrincipal = await AsistenciaValidacion.verificarCodigoQR(qrCodigo);

        // Si no se encuentra el código QR en la tabla
        if (!asistenciaPrincipal) {
            return res.status(404).json({ message: 'Código QR no válido o no encontrado' });
        }

        // Definir tipo de asistencia y estado de asistencia
        const tipoAsistencia = 1;  // Ejemplo de tipo de asistencia (ajustar según tu lógica)
        const estadoAsistencia = 1;  // Ejemplo de estado de asistencia (ajustar según tu lógica)

        // Insertar los datos de validación de la asistencia en la tabla Asistencia_Validacion
        await AsistenciaValidacion.crearAsistenciaValidada(usuarioId, tipoAsistencia, estadoAsistencia, asistenciaPrincipal.AsiPri_Id);

        res.status(200).json({ message: 'QR validado y asistencia registrada exitosamente' });

    } catch (error) {
        console.error('Error al validar QR:', error);  // Imprime todo el error para depuración
        res.status(500).json({ 
            message: 'Error al procesar la validación del QR', 
            error: error.message, 
            stack: error.stack  // Opcional: Muestra el stack para depuración más detallada
        });
    }
};

module.exports = {
    validarQR
};
