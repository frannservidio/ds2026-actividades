import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET, SALT_ROUNDS } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import type { Login, Registro } from "../validations/auth.validation.js";

const datosPublicos = {
  id: true,
  email: true,
  nombre: true,
  rol: true,
} as const;

export const registrar = async (datos: Registro) => {
  const passwordHash = await bcrypt.hash(datos.password, SALT_ROUNDS);

  return prisma.usuario.create({
    data: {
      nombre: datos.nombre,
      email: datos.email,
      passwordHash,
    },
    select: datosPublicos,
  });
};

export const login = async (datos: Login) => {
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
    omit: { passwordHash: false },
  });

  if (!usuario) return null;
  if (!await bcrypt.compare(datos.password, usuario.passwordHash)) return null;

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  const usuarioPublico = {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    rol: usuario.rol,
  };
  return { token, usuario: usuarioPublico };
};

export const buscarPorId = (id: number) => prisma.usuario.findUnique({
  where: { id },
  select: datosPublicos,
});
