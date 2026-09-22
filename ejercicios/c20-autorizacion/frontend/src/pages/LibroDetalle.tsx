import { Link, useParams } from "react-router-dom";
import { Alert, Col, Container, Row } from "react-bootstrap";
import type { LibroDetalle as Detalle } from "../types/libro";
import useFetch from "../hooks/useFetch";

function LibroDetalle() {
  const { id } = useParams();
  const { data: libro, loading, error } = useFetch<Detalle>(`/libros/${id}`);
  if (loading) return <Container className="py-5">Cargando libro...</Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  if (!libro) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          No encontramos el libro solicitado.
        </Alert>
        <Link to="/catalogo" className="btn btn-dark">
          Volver al catalogo
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="g-4 align-items-start">
        <Col md={5} lg={4}>
          <img
            src={libro.imagen}
            alt={libro.titulo}
            className="img-fluid rounded shadow-sm w-100"
            style={{ maxHeight: "520px", objectFit: "cover" }}
          />
        </Col>
        <Col md={7} lg={8}>
          <p className="text-uppercase text-muted small mb-2">{libro.autor.nombre}</p>
          <h1 className="fw-bold">{libro.titulo}</h1>
          <p className="fs-4 fw-semibold text-success">{libro.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
          <p className={libro.disponible ? "text-success" : "text-muted"}>
            {libro.disponible ? "Disponible" : "No disponible"}
          </p>
          <p className="lead">{libro.descripcion}</p>
          <Link to="/catalogo" className="btn btn-outline-dark">
            Volver al catalogo
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default LibroDetalle;
