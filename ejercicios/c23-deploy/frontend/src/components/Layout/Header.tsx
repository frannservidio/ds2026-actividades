import { Button, Container, Nav, Navbar, Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { pathname } = useLocation();
  const { usuario, cargando, logout, tieneRol } = useAuth();
  return <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/"><i className="bi bi-book"></i> Libreria</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" active={pathname === "/"}>Inicio</Nav.Link>
          <Nav.Link as={Link} to="/catalogo" active={pathname.startsWith("/catalogo")}>Catalogo</Nav.Link>
          {!cargando && tieneRol("ADMIN") && <Nav.Link as={Link} to="/libros/nuevo" active={pathname === "/libros/nuevo"}>Nuevo libro</Nav.Link>}
        </Nav>
        {cargando ? <Spinner animation="border" size="sm" role="status" variant="light"><span className="visually-hidden">Cargando sesion...</span></Spinner>
          : usuario ? <div className="d-flex align-items-center gap-2">
            <Navbar.Text>Hola, {usuario.nombre} ·</Navbar.Text>
            <Button variant="outline-light" size="sm" onClick={logout}>Salir</Button>
          </div> : <Nav><Nav.Link as={Link} to="/login" active={pathname === "/login"}>Ingresar</Nav.Link></Nav>}
      </Navbar.Collapse>
    </Container>
  </Navbar>;
}
