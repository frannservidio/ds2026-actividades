import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SinPermiso() {
  return <Container className="py-5">
    <h1>Sin permiso</h1>
    <Alert variant="warning">No tenés permiso para acceder a esta página.</Alert>
    <Link to="/catalogo" className="btn btn-dark">Volver al catálogo</Link>
  </Container>;
}
