import { Container, Row, Col } from "react-bootstrap";
import NavbarLibreria from "./components/NavbarLibreria";
import Hero from "./components/Hero";
import LibroCard from "./components/LibroCard";
import Footer from "./components/Footer";
import { libros } from "./data/libros";

function App() {
  const librosDestacados = libros.filter((libro) => libro.destacado);

  return (
    <>
      <NavbarLibreria paginaActiva="inicio" />

      <Hero
        titulo="Bienvenidos a la Librería"
        subtitulo="Encontrá los mejores libros para cada momento. Explorá nuestro catálogo y descubrí tu próxima lectura."
        textoBoton="Ver catálogo"
      />

      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Libros destacados</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {librosDestacados.map((libro) => (
              <Col key={libro.id}>
                <LibroCard
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

      <Footer nombreTienda="Librería" anio={2026} />
    </>
  );
}

export default App;