import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "../../context/AuthContext";
import type { Rol, Usuario } from "../../types/auth";
import Header from "./Header";

vi.mock("../../context/AuthContext", () => ({ useAuth: vi.fn() }));
const logout = vi.fn();
function sesion(rol?: Rol, cargando = false) {
  const usuario: Usuario | null = rol ? { id: 1, nombre: rol === "ADMIN" ? "Admin" : "Cliente", email: "a@b.com", rol } : null;
  vi.mocked(useAuth).mockReturnValue({ usuario, cargando, login: vi.fn(), logout,
    estaAutenticado: usuario !== null, tieneRol: (requerido) => usuario?.rol === requerido });
  render(<MemoryRouter><Header /></MemoryRouter>);
}
beforeEach(() => vi.clearAllMocks());
describe("Header segun la sesion", () => {
  it("invitado ve Ingresar y no Nuevo libro ni Salir", () => {
    sesion();
    expect(screen.getByRole("link", { name: "Ingresar" })).toHaveAttribute("href", "/login");
    expect(screen.queryByRole("link", { name: "Nuevo libro" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Salir" })).not.toBeInTheDocument();
  });
  it("CLIENTE ve su nombre pero no el alta", () => {
    sesion("CLIENTE");
    expect(screen.getByText(/Hola, Cliente/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Nuevo libro" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Ingresar" })).not.toBeInTheDocument();
  });
  it("ADMIN ve el enlace de alta", () => {
    sesion("ADMIN");
    expect(screen.getByRole("link", { name: "Nuevo libro" })).toHaveAttribute("href", "/libros/nuevo");
    expect(screen.getByText(/Hola, Admin/)).toBeInTheDocument();
  });
  it("Salir llama al logout del contexto", () => {
    sesion("ADMIN");
    fireEvent.click(screen.getByRole("button", { name: "Salir" }));
    expect(logout).toHaveBeenCalledTimes(1);
  });
  it("durante la rehidratacion espera sin mostrar Ingresar", () => {
    sesion(undefined, true);
    expect(screen.getByRole("status")).toHaveTextContent("Cargando sesion");
    expect(screen.queryByRole("link", { name: "Ingresar" })).not.toBeInTheDocument();
  });
});
