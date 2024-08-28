const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Producto', ProductoSchema);
