# C15 - API REST por capas

Sitio de la libreria de la Clase 14 con una API REST separada en `types`,
`services`, `controllers` y `routes`.

## Ejecucion

```bash
cd ejercicios/c15-api-rest/backend
npm install
npm run dev
```

La API queda disponible en `http://localhost:3000`:

- CRUD de libros: `/api/libros`
- CRUD de autores: `/api/autores`

Cada recurso implementa `GET /`, `GET /:id`, `POST /`, `PUT /:id` y
`DELETE /:id`. Las solicitudes de ejemplo, incluidos los casos 404, estan en
`backend/api.http`.

Tambien puede iniciarse el proyecto completo con `docker compose up --build`.
