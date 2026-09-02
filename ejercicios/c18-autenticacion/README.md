# C18 - Autenticacion y autorizacion

Evolucion de la libreria de C17 con usuarios, contrasenas hasheadas, JWT y
permisos por rol.

## Configuracion y ejecucion

1. Copiar `backend/.env.example` como `backend/.env` y reemplazar
   `JWT_SECRET` por una cadena larga y aleatoria.
2. Iniciar la API y PostgreSQL:

```bash
docker compose up --build -d
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
docker compose exec api npx prisma db seed
```

La API queda disponible en `http://localhost:3000`. El seed crea estas cuentas:

- `admin@libreria.test` / `Admin1234` (`ADMIN`)
- `cliente@libreria.test` / `Cliente1234` (`CLIENTE`)

## Permisos

| Endpoint | Invitado | CLIENTE | ADMIN |
| --- | --- | --- | --- |
| `GET /api/libros` y `GET /api/libros/:id` | Si | Si | Si |
| `GET /api/autores` y `GET /api/autores/:id` | Si | Si | Si |
| `POST`, `PUT`, `DELETE` de libros y autores | 401 | 403 | Si |
| `GET /api/auth/yo` | 401 | Si | Si |

Registro y login son publicos. El rol de un registro nuevo siempre es
`CLIENTE`; nunca se acepta desde el body. Las solicitudes de comprobacion,
incluidos los doce casos pedidos, estan en `backend/api.http`.
