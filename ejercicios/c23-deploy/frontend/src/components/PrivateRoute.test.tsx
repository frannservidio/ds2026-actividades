import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { useAuth } from "../context/AuthContext";
import type { Rol } from "../types/auth";
import PrivateRoute from "./PrivateRoute";

vi.mock("../context/AuthContext", () => ({ useAuth: vi.fn() }));
function mostrar(rolUsuario?: Rol, cargando = false, rolRequerido?: Rol) {
  vi.mocked(useAuth).mockReturnValue({
    usuario: rolUsuario ? { id: 1, email: "a@b.com", nombre: "Ana", rol: rolUsuario } : null,
    cargando, estaAutenticado: !!rolUsuario, tieneRol: (rol) => rol === rolUsuario,
    login: vi.fn(), logout: vi.fn(),
  });
  render(<MemoryRouter initialEntries={["/privado"]}><Routes>
    <Route path="/login" element={<h1>Login</h1>} />
    <Route path="/sin-permiso" element={<h1>Sin permiso</h1>} />
    <Route element={<PrivateRoute rol={rolRequerido} />}>
      <Route path="/privado" element={<h1>Contenido privado</h1>} />
    </Route>
  </Routes></MemoryRouter>);
}
describe("PrivateRoute", () => {
  it("espera la rehidratacion antes de redirigir", () => {
    mostrar(undefined, true, "ADMIN");
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
  it("invitado llega al login", () => {
    mostrar(undefined, false, "ADMIN");
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });
  it("CLIENTE no entra a una ruta ADMIN", () => {
    mostrar("CLIENTE", false, "ADMIN");
    expect(screen.getByRole("heading", { name: "Sin permiso" })).toBeInTheDocument();
  });
  it("ADMIN ve la ruta hija mediante Outlet", () => {
    mostrar("ADMIN", false, "ADMIN");
    expect(screen.getByRole("heading", { name: "Contenido privado" })).toBeInTheDocument();
  });
  it("sin rol requerido acepta cualquier usuario autenticado", () => {
    mostrar("CLIENTE");
    expect(screen.getByRole("heading", { name: "Contenido privado" })).toBeInTheDocument();
  });
});
