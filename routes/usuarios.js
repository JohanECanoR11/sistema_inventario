const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        // Verificar si el correo ya está en uso
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const nuevoUsuario = new Usuario({ nombre, email, password, rol });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        const usuarioActualizado = await Usuario.findById(req.params.id);

        if (!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (nombre) usuarioActualizado.nombre = nombre;
        if (email) usuarioActualizado.email = email;
        if (rol) usuarioActualizado.rol = rol;

        // Si se proporciona una nueva contraseña, encripta y actualiza
        if (password) {
            const salt = await bcrypt.genSalt(10);
            usuarioActualizado.password = await bcrypt.hash(password, salt);
        }

        await usuarioActualizado.save();
        res.json({ message: 'Usuario actualizado exitosamente', usuarioActualizado });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
