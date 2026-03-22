const fs = require('fs/promises');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/catalogo.json');

async function leerLibros() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(DATA_PATH, '[]');
      return [];
    }
    //maneja json corrupto
    if(error instanceof SyntaxError){
        console.error('JSON corrupto, reiniciardo archivo...');
        await fs.writeFile(DATA_PATH, '[]');
        return [];
    }
    throw error;
  }
}

async function guardarLibros(libros) {
  await fs.writeFile(DATA_PATH, JSON.stringify(libros, null, 2));
}

module.exports = {leerLibros, guardarLibros};