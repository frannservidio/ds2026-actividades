import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="bi bi-book"></i> Libreria
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav>
            <Nav.Link as={Link} to="/" active={pathname === "/"}>
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/catalogo"
              active={pathname.startsWith("/catalogo")}
            >
              Catalogo
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/libros/nuevo"
              active={pathname === "/libros/nuevo"}
            >
              Nuevo libro
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
