# C17 - Relaciones y validaciones

Evolucion de la libreria de C16 con relaciones Prisma, validacion de entradas
con Zod y manejo centralizado de errores en Express.

## Ejecucion

```bash
cd ejercicios/c17-relaciones-validaciones/backend
npm install
npm run dev
```

La API queda disponible en `http://localhost:3000`:

- CRUD de libros: `/api/libros`
- CRUD de autores: `/api/autores`

El modelo incluye `Autor 1:N Libro` y `Libro N:M Categoria`. El listado de
libros incluye su autor y el detalle incluye autor y categorias. Las entradas
de libros, autores y parametros se validan antes de llegar a los controllers.

Las solicitudes de ejemplo, incluidos los casos 400, 404 y 409, estan en
`backend/api.http`.

El resumen conceptual de la clase esta en [`RESUMEN_CLASE.md`](RESUMEN_CLASE.md).

Tambien puede iniciarse el proyecto completo con `docker compose up --build`.
