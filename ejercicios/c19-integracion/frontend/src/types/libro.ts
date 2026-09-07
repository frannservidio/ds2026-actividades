export type Autor = { id: number; nombre: string; nacionalidad: string };
export type Categoria = { id: number; nombre: string };
export type Libro = {
  id: number; titulo: string; autorId: number; autor: Autor; precio: number;
  imagen: string; descripcion: string; destacado: boolean; disponible: boolean;
};
export type LibroDetalle = Libro & { categorias: Categoria[] };
export type LibroNuevo = Omit<Libro, "id" | "autor">;
