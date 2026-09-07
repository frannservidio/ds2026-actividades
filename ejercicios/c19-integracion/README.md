# AI-C19 · Integración en la Librería

Copia de la Clase 18 organizada en `frontend/` (React + Vite) y `backend/` (Express + Prisma + PostgreSQL).

## Ejecutar

Desde esta carpeta:

```sh
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Reemplazar JWT_SECRET en backend/.env por una cadena aleatoria propia.
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npm run prisma:seed
cd frontend
npm ci
npm run dev
```

Abrir http://localhost:5173. La API usa http://localhost:3000/api.
Los archivos `.env` están ignorados; los `.env.example` se versionan.
El seed es para desarrollo: reemplaza los libros existentes. No ejecutarlo sobre datos que se quieran conservar.

## Integración

- `FRONTEND_URL` configura la lista de orígenes permitidos antes de las rutas.
- `VITE_API_URL` se declara en `src/vite-env.d.ts` y se usa en `services/api.ts`.
- `apiFetch` normaliza la URL, lee el token en cada llamada y preserva `error` del backend; maneja respuestas no JSON.
- Catálogo, detalle y autores leen la API. Se eliminaron los mocks.
- `autor` es un objeto, `precio` es número y el detalle incluye `categorias`.
- Login validado con Zod; guarda el token en localStorage. Cerrar sesión lo elimina.
- El alta envía `autorId` y el token; actualiza el catálogo solo después de una creación exitosa.
- El middleware final devuelve 404 JSON antes del manejador de errores.
- La autorización se aplica en el backend. Contexto de sesión y protección visual por rol quedan para la próxima clase.

## Verificación

```sh
cd frontend
npx tsc -p tsconfig.app.json --noEmit
npm run build
npm run lint
cd ..
node backend/scripts/verificar-integracion.mjs
```

El script requiere el seed y prueba 401 sin token, 403 con CLIENTE, 201 con ADMIN, persistencia en catálogo, login incorrecto, 404 JSON y preflight CORS permitido/rechazado. Limpia el libro temporal.

Para repetir desde el navegador, completar Nuevo libro sin sesión, iniciar sesión como cliente y repetir, y luego como administrador:

| Rol | Email | Contraseña de desarrollo | Alta |
| --- | --- | --- | --- |
| Sin sesión | — | — | 401 |
| CLIENTE | cliente@libreria.test | Cliente1234 | 403 |
| ADMIN | admin@libreria.test | Admin1234 | 201 |

En Network se puede inspeccionar `Authorization: Bearer ...` y el OPTIONS previo al POST. Los errores aparecen en el formulario sin reemplazar el mensaje del backend.

## Resultados comprobados (07/09/2026)

- TypeScript del frontend y backend: sin errores.
- Build y lint del frontend: correctos.
- Prueba contra PostgreSQL real: 401 / 403 / 201, catálogo 200, login incorrecto 401, ruta inexistente 404 y ambos casos CORS correctos.
- `.env` del frontend y backend ignorados por Git.

En esta máquina la instalación limpia (`npm ci`) falló con `Exit handler never called!`, también durante el build Docker. Para verificar se reutilizaron las dependencias locales de C18 y se ejecutó la API con Node y PostgreSQL en el contenedor de C19. La instalación desde cero queda sin verificar. Para ejecutar la API de esta forma, usar `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/libreria_db` en el entorno del proceso, y luego `npm start` desde backend.

La comprobación visual en navegador y el aviso en Discord no pudieron completarse por errores de la sesión del navegador automatizado.
