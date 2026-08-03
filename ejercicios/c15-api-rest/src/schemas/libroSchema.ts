import { z } from "zod";

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, "El titulo es obligatorio"),
  autor: z.string().trim().min(1, "El autor es obligatorio"),
  precio: z.coerce
    .number("El precio es obligatorio")
    .positive("El precio debe ser mayor a 0"),
  descripcion: z
    .string()
    .trim()
    .min(10, "La descripcion debe tener al menos 10 caracteres"),
  disponible: z.boolean(),
});

export type LibroValidado = z.infer<typeof libroSchema>;
export type LibroFormValues = z.input<typeof libroSchema>;
