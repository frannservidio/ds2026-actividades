# AI-C23 · Deploy en la Librería

Copia independiente de C21, preparada para Neon + Render. Prisma se mantiene en 6.19.0.

## Orden de publicación

1. Crear proyecto Neon y guardar la conexión directa con SSL en un lugar privado.
2. Render Web Service: main, raíz `ejercicios/c23-deploy/backend`, runtime Docker, Dockerfile `./Dockerfile.prod`, plan Free. Variables: DATABASE_URL (Neon), JWT_SECRET (generado), FRONTEND_URL (temporalmente http://localhost:5173). No fijar PORT: lo proporciona Render.
3. Render Static Site: main, raíz `ejercicios/c23-deploy/frontend`, build `npm ci && npm run build`, publicación `dist`. Variable VITE_API_URL=https://BACKEND.onrender.com/api. Reescritura `/*` a `/index.html` (Rewrite).
4. Cambiar FRONTEND_URL del backend a la URL exacta del sitio, sin barra final, y esperar el redeploy.
5. Ejecutar `npm run prisma:seed` desde backend con DATABASE_URL de Neon en el entorno. El seed conserva datos existentes y omite libros ya presentes; no se ejecuta automáticamente al arrancar.

## Producción

`npm run build` del backend compila src a dist sin tests. La imagen realiza migrate deploy al arrancar y luego ejecuta Node. Las migraciones están versionadas. `.env` y secretos no se publican en Git.

El seed usa cuentas de demostración ADMIN y CLIENTE y portadas locales. Solo se deben cargar datos ficticios en esta aplicación de práctica.

## Estado

Preparación local verificada: build del backend sin tests en dist, build del frontend y 29 tests aprobados (19 backend y 10 frontend). Los servicios y las URLs públicas todavía no están verificados. La imagen de producción aún debe construirse en Render.
