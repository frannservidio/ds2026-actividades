import { Navbar, Nav, Container } from "react-bootstrap";

type NavbarLibreriaProps = {
  paginaActiva: "inicio" | "catalogo" | "contacto";
};

function NavbarLibreria({ paginaActiva }: NavbarLibreriaProps) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <i className="bi bi-book"></i> Librería
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav>
            <Nav.Link href="#" active={paginaActiva === "inicio"}>
              Inicio
            </Nav.Link>
            <Nav.Link href="#" active={paginaActiva === "catalogo"}>
              Catálogo
            </Nav.Link>
            <Nav.Link href="#" active={paginaActiva === "contacto"}>
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLibreria;
