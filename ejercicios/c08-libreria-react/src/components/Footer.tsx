import { Container } from "react-bootstrap";

type FooterProps = {
  nombreTienda: string;
  anio: number;
};

function Footer({ nombreTienda, anio }: FooterProps) {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <Container>
        <p className="mb-1">
          <i className="bi bi-book"></i> {nombreTienda}
        </p>
        <p className="mb-0 text-muted small">
          &copy; {anio} - Todos los derechos reservados | DS2026 - UTN FRLP
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
