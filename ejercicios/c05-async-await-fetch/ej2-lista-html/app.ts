interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const usuarios: Usuario[] = await response.json();
  return usuarios;
}

function renderUsuarios(usuarios: Usuario[]): void {
  const lista = document.getElementById("lista-usuarios") as HTMLUListElement;

  usuarios.forEach((usuario) => {
    const li = document.createElement("li");
    li.textContent = `${usuario.name} - ${usuario.email}`;
    lista.appendChild(li);
  });
}

function mostrarError(mensaje: string): void {
  const error = document.getElementById("error") as HTMLParagraphElement;
  error.textContent = mensaje;
  error.style.display = "block";
}

async function main(): Promise<void> {
  const loading = document.getElementById("loading") as HTMLParagraphElement;
  loading.style.display = "block";

  try {
    const usuarios = await obtenerUsuarios();
    renderUsuarios(usuarios);
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    mostrarError(mensaje);
  } finally {
    loading.style.display = "none";
  }
}

export {};
