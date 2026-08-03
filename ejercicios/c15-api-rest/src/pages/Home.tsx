import { Col, Container, Row } from "react-bootstrap";
import Hero from "../components/Hero";
import LibroCard from "../components/LibroCard";
import type { Libro } from "../types/libro";

type HomeProps = {
  libros: Libro[];
};

function Home({ libros }: HomeProps) {
  const librosDestacados = libros.filter((libro) => libro.destacado);

  return (
    <>
      <Hero
        titulo="Bienvenidos a la Libreria"
        subtitulo="Encontra los mejores libros para cada momento. Explora nuestro catalogo y descubri tu proxima lectura."
        textoBoton="Ver catalogo"
      />

      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Libros destacados</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {librosDestacados.map((libro) => (
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
      </section>
    </>
  );
}

export default Home;
