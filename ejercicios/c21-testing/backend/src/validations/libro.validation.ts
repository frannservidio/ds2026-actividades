import { z } from "zod";

export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, "El titulo es obligatorio").max(200),
  precio: z.number().int().positive("El precio debe ser mayor a 0"),
  imagen: z.string().trim().min(1, "La imagen es obligatoria"),
  descripcion: z.string().trim().min(1, "La descripcion es obligatoria"),
  destacado: z.boolean().optional(),
  disponible: z.boolean().optional(),
  autorId: z.number().int().positive("El autor es obligatorio"),
});

export const libroUpdateSchema = libroCreateSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un numero positivo"),
});

export type LibroNuevo = z.infer<typeof libroCreateSchema>;
export type LibroActualizado = z.infer<typeof libroUpdateSchema>;
