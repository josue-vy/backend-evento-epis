const Usuario = require('../models/loginModel');

// En tu controlador de login
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validación de entrada
      if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
      }
  
      // Verificar credenciales
      const user = await Usuario.findByEmail(email);
      if (!user || user.Usu_Password !== password) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
  
      // Almacenar el usuario en la sesión
      req.session.user = {
        id: user.Usu_Id,
        nombre: user.Usu_Nombre,
        apellido: user.Usu_Apellido
      };
  
      console.log('Sesión creada:', req.session.user);  // Log para verificar la sesión
  
      res.status(200).json({ message: 'Inicio de sesión exitoso', user: req.session.user });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  

module.exports = { login };
