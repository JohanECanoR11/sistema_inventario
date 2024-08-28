const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
