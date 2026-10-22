import { obtenerToken } from "./sesion";
export const SESION_EXPIRADA = "sesion-expirada";

export class ApiError extends Error {
  readonly status: number;
  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const base = import.meta.env.VITE_API_URL;
  if (!base || !/^https?:\/\//.test(base)) throw new Error("Configura VITE_API_URL con la URL absoluta de la API");
  const headers = new Headers(opciones.headers);
  if (opciones.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const token = obtenerToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(`${base.replace(/\/+$/, "")}/${ruta.replace(/^\/+/, "")}`, { ...opciones, headers });
  const cuerpo: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const mensaje = typeof cuerpo === "object" && cuerpo !== null && "error" in cuerpo && typeof cuerpo.error === "string" ? cuerpo.error : `Error ${res.status}`;
    // Una respuesta de una sesión anterior no debe cerrar una sesión nueva.
    if (res.status === 401 && token && obtenerToken() === token) {
      window.dispatchEvent(new Event(SESION_EXPIRADA));
    }
    throw new ApiError(res.status, mensaje);
  }
  if (cuerpo === null && res.status !== 204) throw new Error("La API no devolvio JSON valido");
  return cuerpo as T;
}
