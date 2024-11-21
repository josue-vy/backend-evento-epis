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
// const sql = require('mssql');

// // Configuración de conexión con las credenciales de SQL Server
// const config = {
//     user: process.env.SQLSERVERUSER,    // El nombre de usuario que creaste ('josue')
//     password: process.env.SQLSERVERPASSWORD,  // La contraseña que asignaste ('josue123')
//     server: process.env.SQLSERVERHOST,    // El servidor de tu base de datos (localhost o el nombre de tu servidor)
//     database: process.env.SQLSERVERDATABASE, // El nombre de la base de datos
//     options: {
//         encrypt: true,                   // Habilita el cifrado para la conexión
//         enableArithAbort: true,          // Habilita la opción para abortar en errores aritméticos
//         trustServerCertificate: true     // Ignora el certificado autofirmado (si es necesario)
//     },
//     driver: process.env.SQLSERVERDRIVER  // El driver adecuado
// };

// // Conexión con SQL Server
// const poolPromise = new sql.ConnectionPool(config)
//     .connect()
//     .then(pool => {
//         console.log('Conectado a la base de datos SQL Server');
//         return pool;
//     })
//     .catch(err => {
//         console.error('Error al conectar a SQL Server:', err);
//     });

// module.exports = {
//     sql,
//     poolPromise
// };
