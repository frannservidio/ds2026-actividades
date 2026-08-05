export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: string;
  imagen: string;
  descripcion: string;
  destacado: boolean;
  disponible: boolean;
}

export type LibroNuevo = Omit<Libro, "id">;
export type LibroActualizado = Partial<LibroNuevo>;
