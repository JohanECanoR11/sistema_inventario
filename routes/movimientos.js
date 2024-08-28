const express = require('express');
const router = express.Router();
const Movimiento = require('../models/Movimiento');
const Producto = require('../models/Producto');

// Crear un nuevo movimiento de inventario
router.post('/', async (req, res) => {
    try {
        const nuevoMovimiento = new Movimiento(req.body);
        const movimientoGuardado = await nuevoMovimiento.save();

        // Actualizar la cantidad en stock del producto
        const producto = await Producto.findById(movimientoGuardado.producto);
        if (movimientoGuardado.tipo === 'entrada') {
            producto.cantidad += movimientoGuardado.cantidad;
        } else if (movimientoGuardado.tipo === 'salida') {
            producto.cantidad -= movimientoGuardado.cantidad;
        }
        await producto.save();

        res.status(201).json(movimientoGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener todos los movimientos
router.get('/', async (req, res) => {
    try {
        const movimientos = await Movimiento.find().populate('producto');
        res.json(movimientos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un movimiento por ID
router.get('/:id', async (req, res) => {
    try {
        const movimiento = await Movimiento.findById(req.params.id).populate('producto');
        if (!movimiento) return res.status(404).json({ message: 'Movimiento no encontrado' });
        res.json(movimiento);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar un movimiento
router.delete('/:id', async (req, res) => {
    try {
        const movimiento = await Movimiento.findByIdAndDelete(req.params.id);

        // Revertir la cantidad en stock del producto
        const producto = await Producto.findById(movimiento.producto);
        if (movimiento.tipo === 'entrada') {
            producto.cantidad -= movimiento.cantidad;
        } else if (movimiento.tipo === 'salida') {
            producto.cantidad += movimiento.cantidad;
        }
        await producto.save();

        res.json({ message: 'Movimiento eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
