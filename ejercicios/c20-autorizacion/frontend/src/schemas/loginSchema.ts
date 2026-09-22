import { z } from "zod";
export const loginSchema = z.object({ email: z.string().trim().toLowerCase().pipe(z.email("Email invalido")), password: z.string().min(1, "La contrasena es obligatoria") });
export type LoginValues = z.infer<typeof loginSchema>;
