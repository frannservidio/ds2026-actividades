import { Container, Button } from "react-bootstrap";

type HeroProps = {
  titulo: string;
  subtitulo: string;
  textoBoton: string;
};

function Hero({ titulo, subtitulo, textoBoton }: HeroProps) {
  return (
    <section
      className="text-white text-center py-5"
      style={{ backgroundColor: "#343a40" }}
    >
      <Container>
        <h1 className="display-4 fw-bold">{titulo}</h1>
        <p className="lead mt-3">{subtitulo}</p>
        <Button variant="warning" size="lg" className="mt-4">
          <i className="bi bi-search"></i> {textoBoton}
        </Button>
      </Container>
    </section>
  );
}

export default Hero;
