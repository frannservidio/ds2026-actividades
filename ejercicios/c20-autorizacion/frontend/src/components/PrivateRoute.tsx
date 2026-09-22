import { Container, Spinner } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Rol } from "../types/auth";

export default function PrivateRoute({ rol }: { rol?: Rol }) {
  const { cargando, estaAutenticado, tieneRol } = useAuth();
  if (cargando) return <Container className="py-5 text-center">
    <Spinner animation="border" role="status"><span className="visually-hidden">Cargando sesion...</span></Spinner>
  </Container>;
  if (!estaAutenticado) return <Navigate to="/login" replace />;
  if (rol && !tieneRol(rol)) return <Navigate to="/sin-permiso" replace />;
  return <Outlet />;
}
