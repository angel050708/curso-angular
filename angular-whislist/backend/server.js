const express = require('express');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// CORS manual (permite peticiones desde Angular dev server)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// In-memory array of destinos
let destinos = [
  { id: '1', nombre: 'Buenos Aires', imagenUrl: 'https://picsum.photos/seed/bsas/400/300', votes: 5, servicios: ['hotel', 'tours', 'wifi'] },
  { id: '2', nombre: 'Madrid', imagenUrl: 'https://picsum.photos/seed/madrid/400/300', votes: 3, servicios: ['hotel', 'desayuno'] },
];

// GET /api/destinos - retorna todos los destinos
app.get('/api/destinos', (req, res) => {
  console.log('[GET] /api/destinos - Retornando', destinos.length, 'destinos');
  res.json(destinos);
});

// GET /api/destinos/:id - retorna un destino por ID
app.get('/api/destinos/:id', (req, res) => {
  const destino = destinos.find(d => d.id === req.params.id);
  if (destino) {
    res.json(destino);
  } else {
    res.status(404).json({ error: 'Destino no encontrado' });
  }
});

// POST /api/destinos - agrega un nuevo destino
app.post('/api/destinos', (req, res) => {
  const { nombre, imagenUrl, votes = 0, servicios = [] } = req.body;
  
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }

  const nuevoDestino = {
    id: Date.now().toString(),
    nombre,
    imagenUrl: imagenUrl || 'https://picsum.photos/seed/' + nombre.toLowerCase().replace(/\s/g, '') + '/400/300',
    votes,
    servicios: servicios.length ? servicios : ['pileta', 'desayuno', 'wifi']
  };

  destinos.push(nuevoDestino);
  console.log('[POST] /api/destinos - Agregado:', nuevoDestino.nombre);
  
  res.status(201).json(nuevoDestino);
});

// DELETE /api/destinos/:id - elimina un destino
app.delete('/api/destinos/:id', (req, res) => {
  const index = destinos.findIndex(d => d.id === req.params.id);
  if (index !== -1) {
    const eliminado = destinos.splice(index, 1)[0];
    res.json({ message: 'Eliminado', destino: eliminado });
  } else {
    res.status(404).json({ error: 'Destino no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Express API corriendo en http://localhost:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  GET    /api/destinos      - Listar todos`);
  console.log(`  GET    /api/destinos/:id  - Obtener uno`);
  console.log(`  POST   /api/destinos      - Agregar nuevo`);
  console.log(`  DELETE /api/destinos/:id  - Eliminar`);
});
