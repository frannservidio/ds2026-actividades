import { useEffect } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import LibroCard from "../components/LibroCard";
import type { Libro } from "../types/libro";

type CatalogoProps = {
  libros: Libro[];
  loading: boolean;
  error: string | null;
};

function Catalogo({ libros, loading, error }: CatalogoProps) {
  useEffect(() => {
    document.title = "Catalogo | Libreria React";
  }, []);

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Catalogo</h1>
        <p className="text-muted mb-0">
          Todos los libros disponibles en nuestra libreria.
        </p>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="dark">
            <span className="visually-hidden">Cargando catalogo...</span>
          </Spinner>
          <p className="text-muted mt-3 mb-0">Cargando catalogo...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && libros.length === 0 && (
        <Alert variant="info">No hay libros disponibles por el momento.</Alert>
      )}

      {!loading && !error && libros.length > 0 && (
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
      )}
    </Container>
  );
}

export default Catalogo;
