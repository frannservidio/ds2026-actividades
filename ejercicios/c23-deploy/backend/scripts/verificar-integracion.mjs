import assert from 'node:assert/strict';

const base = process.env.API_URL ?? 'http://localhost:3000/api';
async function request(path, status, options = {}) {
  const response = await fetch(`${base}${path}`, options);
  const body = await response.json();
  assert.equal(response.status, status, JSON.stringify(body));
  console.log(`${options.method ?? 'GET'} ${path}: ${status}`);
  return body;
}
const post = (body, token) => ({ method: 'POST', headers: {
  'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}),
}, body: JSON.stringify(body) });
const autores = await request('/autores', 200);
assert.ok(autores.length, 'Ejecutar el seed antes de verificar');
const libro = { titulo: 'Prueba integracion C19', autorId: autores[0].id, precio: 15000,
  imagen: '/favicon.svg', descripcion: 'Libro temporal para verificar la integracion', disponible: true };
await request('/libros', 401, post(libro));
const cliente = await request('/auth/login', 200, post({ email: 'cliente@libreria.test', password: 'Cliente1234' }));
await request('/libros', 403, post(libro, cliente.token));
const admin = await request('/auth/login', 200, post({ email: 'admin@libreria.test', password: 'Admin1234' }));
const creado = await request('/libros', 201, post(libro, admin.token));
try {
  assert.equal(typeof creado.autor.nombre, 'string');
  assert.equal(typeof creado.precio, 'number');
  const libros = await request('/libros', 200);
  assert.ok(libros.some(item => item.id === creado.id));
  await request('/ruta-inexistente', 404);
  const error = await request('/auth/login', 401, post({ email: 'admin@libreria.test', password: 'incorrecta' }));
  assert.equal(error.error, 'Credenciales invalidas');
  for (const origin of ['http://localhost:5173', 'http://localhost:5174']) {
    const response = await fetch(`${base}/libros`, { method: 'OPTIONS', headers: {
      Origin: origin, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'authorization,content-type',
    } });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), origin.endsWith('5173') ? origin : null);
    console.log(`Preflight ${origin}: OK`);
  }
} finally {
  const response = await fetch(`${base}/libros/${creado.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${admin.token}` } });
  assert.ok(response.ok, 'No se pudo limpiar el libro temporal');
}
