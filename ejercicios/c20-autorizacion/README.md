# AI-C20-B · Autorización en la Librería

Copia de C19 con autorización en el frontend. No se agregaron dependencias ni se cambiaron las reglas de autorización del backend.

## Ejecutar

Desde esta carpeta, copiar `backend/.env.example` a `backend/.env` y `frontend/.env.example` a `frontend/.env`. Elegir un JWT_SECRET propio en el backend.

```sh
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npm run prisma:seed
cd frontend
npm ci
npm run dev
```

Frontend: http://localhost:5173. API: http://localhost:3000/api.
Detener los servicios de C19 si están usando esos mismos puertos.
El seed es para desarrollo y reemplaza los libros existentes.

## Implementación

- `src/context/AuthContext.tsx`: contexto nullable, AuthProvider y useAuth que lanza un error fuera del Provider. Expone usuario, cargando, login, logout, estaAutenticado y tieneRol.
- Al recargar con token se consulta GET `/auth/yo`; no se decodifica el JWT. Se cancela la consulta al desmontar y se ignoran respuestas anteriores a un cambio de sesión.
- `services/sesion.ts` concentra el acceso al token. Solo lo importan api.ts y el contexto. Login usa login() del contexto.
- La navbar muestra Ingresar o Hola, nombre · Salir; Nuevo libro aparece únicamente para ADMIN. Mientras se recupera la sesión muestra un Spinner.
- `PrivateRoute` es una layout route con Outlet, rol opcional, Spinner y Navigate con replace. `/libros/nuevo` exige ADMIN; `/sin-permiso` es pública.
- `ApiError` conserva status y el mensaje del backend. Un 401 de la sesión actual dispara sesion-expirada; el Provider escucha el evento y ejecuta logout. Un 403 no cierra sesión. El listener se elimina al desmontar.
- El token sigue en localStorage según el alcance de la clase. La autorización real sigue siendo responsabilidad del backend.

## Matriz para comprobar manualmente

| Estado | Navbar | Abrir /libros/nuevo |
| --- | --- | --- |
| Invitado | Ingresar, sin Nuevo libro | Redirige a /login |
| CLIENTE | Hola, Cliente · Salir, sin Nuevo libro | Redirige a /sin-permiso |
| ADMIN | Hola, Admin · Salir, con Nuevo libro | Muestra el alta |
| Recargando con token | Spinner hasta GET /auth/yo | Espera sin redirigir prematuramente |
| Token inválido o vencido | Limpia sesión y muestra Ingresar | Redirige a /login |

Usuarios de desarrollo: `admin@libreria.test / Admin1234` y `cliente@libreria.test / Cliente1234`.

## Verificación realizada (22/09/2026)

```sh
cd frontend
npx tsc -p tsconfig.app.json --noEmit
npm run build
npm run lint
```

Los tres comandos finalizaron sin errores. Dependencias y versiones coinciden con C19.

Se verificó en Edge sin interfaz, con respuestas de API controladas: acceso de invitado, login incorrecto con mensaje real, login CLIENTE, rehidratación, rechazo por rol, logout con borrado del token, acceso ADMIN, recarga con Spinner y cierre automático por 401 con ApiError y redirección. Estas pruebas verifican el frontend; no equivalen a una nueva prueba contra PostgreSQL real.
