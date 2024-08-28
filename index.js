const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)


.then(() => console.log('Conectado a la base de datos'))
.catch((err) => console.error('Error al conectar a la base de datos:', err));

// Otras importaciones...
const authMiddleware = require('./middleware/authMiddleware');

// Rutas de autenticación
app.use('/api/auth', require('./routes/auth'));

// Proteger las rutas que requieren autenticación
app.use('/api/productos', authMiddleware, require('./routes/productos'));
app.use('/api/categorias', authMiddleware, require('./routes/categorias'));
app.use('/api/movimientos', authMiddleware, require('./routes/movimientos'));
app.use('/api/usuarios', authMiddleware, require('./routes/usuarios'));

// Rutas
app.use('/api/productos', require('./routes/productos'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/movimientos', require('./routes/movimientos'));
app.use('/api/usuarios', require('./routes/usuarios'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});




