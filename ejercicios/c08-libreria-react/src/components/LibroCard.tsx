import { useState } from "react";
import { Card, Button } from "react-bootstrap";

type LibroCardProps = {
  titulo: string;
  autor: string;
  precio: string;
  imagen: string;
};

function LibroCard({ titulo, autor, precio, imagen }: LibroCardProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imagen}
        alt={titulo}
        style={{ height: "280px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted">{autor}</Card.Text>
        <Card.Text className="fw-bold fs-5 mt-auto">{precio}</Card.Text>
        <div className="d-flex gap-2">
          <Button variant="outline-dark" className="flex-grow-1">
            Ver más
          </Button>
          <Button
            variant={liked ? "danger" : "outline-danger"}
            onClick={() => setLiked(!liked)}
          >
            <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;