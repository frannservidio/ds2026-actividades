import { Link, useParams } from "react-router-dom";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { libros } from "../data/libros";

function LibroDetalle() {
  const { id } = useParams();
  const libro = libros.find((item) => item.id === Number(id));

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
          <p className="text-uppercase text-muted small mb-2">{libro.autor}</p>
          <h1 className="fw-bold">{libro.titulo}</h1>
          <p className="fs-4 fw-semibold text-success">{libro.precio}</p>
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
