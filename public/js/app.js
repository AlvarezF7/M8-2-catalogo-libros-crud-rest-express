const API = '/libros/';

const tabla = document.getElementById('tablaLibros');
const form = document.getElementById('formLibro');
const formSection = document.getElementById('form-section');
const btnAgregar = document.getElementById('btnAgregar');
const btnCerrar = document.getElementById('btnCerrar');

let editando = false;


// Función: Cargar libros
async function cargarLibros() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    tabla.innerHTML = '';
    data.data.forEach(libro => {
      tabla.innerHTML += `
        <tr>
          <td>${libro.id}</td>
          <td>${libro.titulo}</td>
          <td>${libro.autor}</td>
          <td>${libro.anio}</td>
          <td>
            <button id="edit-${libro.id}">Editar</button>
            <button id="delete-${libro.id}" class="delete">X</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Error al cargar libros:", error);
  }
}

// Event Delegation para Editar / Eliminar
tabla.addEventListener('click', (e) => {
  const id = e.target.id;
  if (id.startsWith('edit-')) {
    const libroId = id.split('-')[1];
    prepararEdicion(libroId);
  }
  if (id.startsWith('delete-')) {
    const libroId = id.split('-')[1];
    eliminarLibro(libroId);
  }
});

btnAgregar.addEventListener('click', () => {
  formSection.classList.remove('hidden');
});

btnCerrar.addEventListener('click', () => {
  cancelar();
});

// Cancelar / reset formulario
function cancelar() {
  form.reset();
  formSection.classList.add('hidden');
  editando = false;
}

// Preparar formulario para editar
async function prepararEdicion(id) {
  try {
    const res = await fetch(API);
    const data = await res.json();
    const libro = data.data.find(l => l.id == id);

    if (!libro) {
      alert("No encontrado");
      return;
    }

    document.getElementById('id').value = libro.id;
    document.getElementById('titulo').value = libro.titulo;
    document.getElementById('autor').value = libro.autor;
    document.getElementById('anio').value = libro.anio;

    editando = true;
    formSection.classList.remove('hidden');
  } catch (error) {
    console.error("Error al preparar edición:", error);
  }
}

// Guardar o actualizar libro
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('id').value;
  const libro = {
    titulo: document.getElementById('titulo').value,
    autor: document.getElementById('autor').value,
    anio: Number(document.getElementById('anio').value)
  };

  try {
    let res;
    if (editando) {
      res = await fetch(API + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libro)
      });
    } else {
      res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libro)
      });
    }

    const data = await res.json();
    if (res.status === 200 || res.status === 201) {
      alert("Operación exitosa");
    } else if (res.status === 404) {
      alert("No encontrado");
    } else {
      alert( data.mensaje);
    }
    cancelar();
    cargarLibros();
  } catch (error) {
    console.error("Error al guardar libro:", error);
  }
});

// Eliminar libro
async function eliminarLibro(id) {
  if (!confirm("¿Eliminar libro?")) return;

  try {
    const res = await fetch(API + id, { method: 'DELETE' });

    if (res.status === 200) {
      alert("Eliminado correctamente");
    } else if (res.status === 404) {
      alert("No encontrado");
    } else {
      alert("Error al eliminar");
    }
    cargarLibros();
  } catch (error) {
    console.error("Error al eliminar libro:", error);
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  cargarLibros();
});