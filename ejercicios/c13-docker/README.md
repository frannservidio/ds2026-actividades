# C13 - Docker + backend

Sitio de libreria copiado desde `ejercicios/c11-hooks`, con un entorno Docker basico para backend y base de datos.

## Servicios

- `api`: backend Express en `http://localhost:3000`.
- `db`: PostgreSQL 16 con volumen persistente `pgdata`.

## Uso

```bash
cd ejercicios/c13-docker
cp backend/.env.example backend/.env
docker compose up --build
```

Endpoints utiles:

- `GET http://localhost:3000/`
- `GET http://localhost:3000/health`
- `GET http://localhost:3000/db-check`

Para bajar los servicios:

```bash
docker compose down
```

Para bajar los servicios y borrar la base persistida:

```bash
docker compose down -v
```
