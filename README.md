## M8-2 Catalogo Libros CRUD Rest + express + File System

## Descripción
Proyecto que implementa un servidor REST para gestionar un catálogo de libros utilizando Node.js y Express. Los datos se almacenan de forma persistente en un archivo JSON local, permitiendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con respuestas adecuadas y manejo de errores.

## Tecnologías utilizadas
- Node.js  
- Express  
- HTML / CSS / JavaScript  
- Archivo JSON para almacenamiento local (catalogo.json)

## Estructura Proyecto
![Estructura del proyecto](https://github.com/AlvarezF7/M8-2-catalogo-libros-crud-rest-express/blob/main/public/img/estructura-proyecto.png)

## Funcionalidades

- Crear nuevos libros con título, autor y año.  
- Listar todos los libros disponibles.  
- Actualizar libros existentes.  
- Eliminar libros.  
- Manejo de errores y respuestas con códigos HTTP apropiados.  
- Lectura y escritura asíncrona del archivo JSON para evitar bloqueo.
- En la vista  catalogo , al hacer clic en en logo devuelve a la pagina principal.


## Endpoints
| Método | Ruta          | Descripción                  |
|--------|---------------|------------------------------|
| GET    | /libros       | Obtener listado de libros    |
| POST   | /libros       | Crear un nuevo libro         |
| PUT    | /libros/:id   | Actualizar libro por ID      |
| DELETE | /libros/:id   | Eliminar libro por ID        |

## Capturas vista Catalogo PC y Ipad
![vista PC](https://github.com/AlvarezF7/M8-2-catalogo-libros-crud-rest-express/blob/main/public/img/vista-pc.png)
![Vista Ipad](https://github.com/AlvarezF7/M8-2-catalogo-libros-crud-rest-express/blob/main/public/img/vista-ipad.png)
## Instrucciones de ejecución

1. Instalar dependencias: **npm install**
2. Ejecutar servidor:**npm start**
3. Abrir en el navegador: http://localhost:3000


## Notas
- El proyecto utiliza un archivo JSON local (catalogo.json) para almacenar los datos de los libros. Esto significa que no está pensado para ambientes de producción o alta concurrencia, ya que la escritura y lectura concurrente puede causar inconsistencias.



## Autor
Fernanda Álvarez para curso Fullstack Javascript Sence.


