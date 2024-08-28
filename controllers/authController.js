// controllers/authController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.register = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        // Verificar si el correo ya está registrado
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        usuario = new Usuario({ nombre, email, password, rol });
        await usuario.save();

        // Generar token
        const payload = { userId: usuario._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, usuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar token
        const payload = { userId: usuario._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, usuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
