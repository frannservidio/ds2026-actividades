# Resumen de la clase 17: relaciones y validaciones

## Relaciones en la base de datos

Guardar el nombre del autor como texto dentro de cada libro duplica informacion
y permite inconsistencias. Una clave foranea (`autorId`) referencia la clave
primaria de `Autor`, y la base garantiza la integridad referencial.

Las relaciones se reconocen preguntando en ambas direcciones:

- **1:1:** cada registro se relaciona con uno del otro lado. La clave foranea
  lleva `@unique`.
- **1:N:** un autor tiene muchos libros y cada libro tiene un autor. La clave
  foranea siempre queda del lado N, en `Libro`.
- **N:M:** un libro puede tener varias categorias y una categoria varios libros.
  Prisma puede administrar una tabla intermedia implicita. Si el vinculo tiene
  datos propios, como fecha, cantidad o estado, se modela de forma explicita.

Las acciones referenciales definen que pasa al borrar un registro relacionado.
`Restrict` evita borrar un autor con libros; `Cascade` borra tambien los hijos y
debe usarse con cuidado; `SetNull` exige que la clave foranea sea opcional.

## Consultas y tipos con Prisma

`include` devuelve las relaciones junto con la entidad y cambia el contrato JSON
de la API. El listado puede incluir el autor, mientras que el detalle incluye el
autor y las categorias. `Prisma.LibroGetPayload` conserva en TypeScript la forma
real de cada consulta y evita perder el tipo de las relaciones incluidas.

El seed debe crear primero autores y categorias. Luego crea los libros mediante
`connect`, usando campos unicos y dejando que la base genere los identificadores.
Una migracion que agrega una clave foranea obligatoria puede requerir un reset en
desarrollo. En produccion se hace de forma incremental: columna opcional, carga
de datos y finalmente columna obligatoria.

## Validacion por capas

La defensa en profundidad tiene tres niveles:

1. El frontend ofrece una buena experiencia, pero puede evitarse.
2. El backend protege la aplicacion y nunca confia en el cliente.
3. La base preserva restricciones como `NOT NULL`, `@unique` y claves foraneas.

No todo error es lo mismo: Zod valida la forma del dato; el service aplica reglas
de negocio que requieren consultar la base; Prisma y PostgreSQL hacen cumplir las
restricciones. Por eso un titulo vacio es 400, un recurso inexistente es 404 y un
duplicado o un borrado incompatible con el estado actual es 409.

Para cada recurso hay un schema de creacion y otro de actualizacion derivado con
`.partial()`. Los parametros de URL tambien son entrada y se validan con
`z.coerce.number()`, porque Express los recibe como texto. `safeParse` permite
enviar los errores al flujo controlado sin lanzar excepciones manualmente.

## Middleware y manejo de errores

Express ejecuta los middlewares en el orden en que se registran. `express.json()`
debe ir antes de las rutas; `validate` y `validateParams` van antes del controller;
y `errorHandler`, con sus cuatro parametros, va despues de todas las rutas.

`next()` continua la cadena normal y `next(error)` salta al manejador de errores.
En Express 5 las promesas rechazadas de controllers asincronos llegan al
`errorHandler`, por lo que no hacen falta `try/catch` repetidos. En un solo lugar
se traducen los errores de Zod y los codigos de Prisma: P2002 a 409, P2025 a 404 y
P2003 a 409.

La regla practica para los status es: si el cliente puede corregir el request,
corresponde un 4xx; un 500 se reserva para fallas internas de la aplicacion.
