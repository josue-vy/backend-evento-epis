const sql = require('mssql');

const config = {
    user: process.env.MYSQLUSER,         // Tu usuario de base de datos
    password: process.env.MYSQLPASSWORD, // Tu contraseña de base de datos
    server: process.env.MYSQLHOST,       // Tu servidor de base de datos (sql.bsite.net)
    database: process.env.MYSQLDATABASE, // Tu base de datos
    options: {
        encrypt: true,                   // Habilita el cifrado para la conexión
        enableArithAbort: true,          // Habilita la opción para abortar en errores aritméticos
        trustServerCertificate: true     // Ignora el certificado autofirmado (sin validación del certificado)
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar a SQL Server:', err);
    });

module.exports = {
    sql,
    poolPromise
};
