const { poolPromise, sql } = require('../database/database');

const Usuario = {
    findByEmail: async (email) => {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query(`
                SELECT Usu_Id, Usu_Nombre, Usu_Apellido, Usu_Password 
                FROM Usuario 
                WHERE Usu_Email = @email
            `);
        return result.recordset[0]; // Retorna el primer usuario encontrado
    }
};

module.exports = Usuario;
