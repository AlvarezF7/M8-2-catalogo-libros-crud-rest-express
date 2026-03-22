
const { leerLibros, guardarLibros } = require('../models/libro.model');

// GET
async function obtenerLibros(req, res) {
  const libros = await leerLibros();
  res.status(200).json({ ok: true, data: libros });
}

// POST
async function crearLibro(req, res) {
  const { titulo, autor, anio } = req.body;

  if (!titulo || !autor || !Number.isInteger(anio)) {
    return res.status(400).json({ ok: false, mensaje: 'Datos inválidos' });
  }

  const libros = await leerLibros();
  const nuevoId = Math.max(0, ...libros.map(l => l.id)) + 1;

  const nuevoLibro = { id: nuevoId, titulo, autor, anio };

  libros.push(nuevoLibro);
  await guardarLibros(libros);

  res.status(201).json({ ok: true, data: nuevoLibro });
}

// PUT
async function actualizarLibro(req, res) {
  const id = Number(req.params.id);
  const { titulo, autor, anio } = req.body;

  if (!Number.isInteger(id) || !titulo || !autor || !Number.isInteger(anio)) {
    return res.status(400).json({ ok: false, mensaje: 'Datos inválidos' });
  }

  const libros = await leerLibros();
  const index = libros.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ ok: false, mensaje: 'No encontrado' });
  }

  libros[index] = { id, titulo, autor, anio };
  await guardarLibros(libros);

  res.status(200).json({ ok: true, data: libros[index] });
}

// DELETE
async function eliminarLibro(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, mensaje: 'ID inválido' });
  }

  const libros = await leerLibros();
  const index = libros.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ ok: false, mensaje: 'No encontrado' });
  }

  const eliminado = libros.splice(index, 1)[0];
  await guardarLibros(libros);

  res.status(200).json({ ok: true, data: eliminado });
}

module.exports = { obtenerLibros, crearLibro, actualizarLibro, eliminarLibro};