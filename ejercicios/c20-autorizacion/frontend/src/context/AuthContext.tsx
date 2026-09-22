import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { apiFetch, SESION_EXPIRADA } from "../services/api";
import { borrarToken, guardarToken, obtenerToken } from "../services/sesion";
import type { Credenciales, Rol, Sesion, Usuario } from "../types/auth";

type AuthContextType = {
  usuario: Usuario | null;
  cargando: boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(() => !!obtenerToken());
  const revision = useRef(0);

  const logout = useCallback(() => {
    revision.current += 1;
    borrarToken();
    setUsuario(null);
    setCargando(false);
  }, []);

  useEffect(() => {
    window.addEventListener(SESION_EXPIRADA, logout);
    return () => window.removeEventListener(SESION_EXPIRADA, logout);
  }, [logout]);

  useEffect(() => {
    if (!obtenerToken()) return;
    const controller = new AbortController();
    const actual = revision.current;
    const vigente = () => !controller.signal.aborted && actual === revision.current;
    apiFetch<Usuario>("/auth/yo", { signal: controller.signal })
      .then((datos) => { if (vigente()) setUsuario(datos); })
      .catch(() => { if (vigente()) logout(); })
      .finally(() => { if (vigente()) setCargando(false); });
    return () => controller.abort();
  }, [logout]);

  const login = async (credenciales: Credenciales) => {
    const actual = ++revision.current;
    try {
      const sesion = await apiFetch<Sesion>("/auth/login", {
        method: "POST", body: JSON.stringify(credenciales),
      });
      if (actual !== revision.current) return;
      guardarToken(sesion.token);
      setUsuario(sesion.usuario);
    } finally {
      if (actual === revision.current) setCargando(false);
    }
  };

  return <AuthContext.Provider value={{ usuario, cargando, login, logout,
    estaAutenticado: usuario !== null, tieneRol: (rol) => usuario?.rol === rol,
  }}>{children}</AuthContext.Provider>;
}

// Contexto, Provider y hook se mantienen juntos siguiendo el patrón de C12.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
