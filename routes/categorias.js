const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');

// Crear una nueva categoría
router.post('/', async (req, res) => {
    try {
        const nuevaCategoria = new Categoria(req.body);
        const categoriaGuardada = await nuevaCategoria.save();
        res.status(201).json(categoriaGuardada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(categoriaActualizada);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
    try {
        await Categoria.findByIdAndDelete(req.params.id);
        res.json({ message: 'Categoría eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
