import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <Container>
        <p className="mb-1">
          <i className="bi bi-book"></i> Libreria
        </p>
        <p className="mb-0 text-white-50 small">
          &copy; 2026 - Todos los derechos reservados | DS2026 - UTN FRLP
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
