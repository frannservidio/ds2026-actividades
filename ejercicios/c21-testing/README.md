# AI-C21 · Testing en la Librería

Copia independiente de C20. La actividad C20 no se modifica.

## Preparación y ejecución

En cada carpeta (`backend` y `frontend`), ejecutar `npm ci`.
Antes de probar el backend, generar Prisma:

```sh
cd backend
npm run prisma:generate
npm test
npm run test:watch
npx tsc --noEmit
```

```sh
cd frontend
npm test
npm run test:watch
npx tsc -p tsconfig.app.json --noEmit
npm run build
npm run lint
```

Para generar Prisma fuera de Docker, copiar primero `backend/.env.example` a `backend/.env`. La generación no requiere que la base esté encendida. Las pruebas inyectan su propio JWT_SECRET de test y DATABASE_URL con host localhost desde `vitest.config.mts`.

## Qué se prueba

| Archivo | Tipo y comportamiento |
| --- | --- |
| backend/src/validations/libro.validation.test.ts | Unitario puro: precio válido, límites, título e id |
| backend/src/validations/auth.validation.test.ts | Unitario puro: normalización de email y reglas de password |
| backend/src/middlewares/auth.middleware.test.ts | Mocks vi.fn(): authorize y authenticate, firma y expiración de JWT |
| backend/src/routes/libros.routes.test.ts | Integración Supertest: 401 invitado, 403 CLIENTE, 400 ADMIN y 404 JSON |
| frontend/src/components/Layout/Header.test.tsx | Testing Library: invitado, CLIENTE, ADMIN, logout y carga |
| frontend/src/components/PrivateRoute.test.tsx | Testing Library: espera, redirecciones, rol opcional y Outlet |

Todos los tests actuales funcionan **sin DB**. Los requests de integración usan Express y sus middlewares reales; se detienen antes de acceder a Prisma. No se simula una creación 201 ni se presenta como probada. No hay tests dependientes de DB mezclados con esta suite; si se incorporan, deben ir en un archivo aparte `*.db.test.ts` con un comentario explícito sobre PostgreSQL y sus datos requeridos.

Los tests están dentro de `src` y participan del chequeo TypeScript. Los mocks de Express se tipan explícitamente y los mocks del contexto usan `vi.mocked(useAuth)`.

## App y Docker

`src/app.ts` configura y exporta Express sin llamar a listen. `src/index.ts` importa la app y abre el puerto. Supertest importa app; Docker conserva `npm run dev` y `tsx watch src/index.ts`.

Para ejecutar el sitio, copiar los `.env.example` de ambos proyectos a `.env`, elegir JWT_SECRET propio y ejecutar desde esta carpeta:

```sh
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npm run prisma:seed
```

Luego `npm run dev` en frontend. Los puertos por defecto son 3000, 5432 y 5173; no ejecutar otra clase en los mismos puertos. El seed reemplaza los libros de la base de desarrollo.

## Dependencias

Las dependencias de ejecución heredadas de C20 se conservan. Solo se incorpora el kit de testing pedido por C21 como devDependencies: Vitest y Supertest con sus tipos en backend; Vitest, jsdom, Testing Library y jest-dom en frontend. No se agregan otras herramientas ni dependencias de aplicación. Este kit no estaba declarado en la actividad C20 de partida.

## Resultados verificados (28/09/2026)

- Backend: 19 tests verdes en 4 archivos; `npx tsc --noEmit` sin errores, incluyendo los tests.
- Frontend: 10 tests verdes en 2 archivos; `npx tsc -p tsconfig.app.json --noEmit`, build y lint sin errores.
- 29 tests en total, todos sin base de datos.
- `npm run dev` comprobado en Docker con el código C21 montado sobre una imagen local existente: 404 JSON y 401 sin token correctos. No se verificó una reconstrucción limpia de la imagen.
- C20 quedó intacta; los `.env` están ignorados por Git.

La instalación del kit necesitó una excepción temporal de certificados autorizada para esas instalaciones. No se guardó esa excepción en la configuración del proyecto. Prisma se generó con los motores locales de la misma versión 6.19.0 porque su descarga fallaba. Son condiciones del entorno de verificación, no cambios en el código de la aplicación.
