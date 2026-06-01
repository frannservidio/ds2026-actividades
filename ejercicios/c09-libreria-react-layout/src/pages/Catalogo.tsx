import { Col, Container, Row } from "react-bootstrap";
import LibroCard from "../components/LibroCard";
import { libros } from "../data/libros";

function Catalogo() {
  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Catalogo</h1>
        <p className="text-muted mb-0">
          Todos los libros disponibles en nuestra libreria.
        </p>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {libros.map((libro) => (
          <Col key={libro.id}>
            <LibroCard
              id={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              precio={libro.precio}
              imagen={libro.imagen}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;
