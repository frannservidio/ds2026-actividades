export type Libro = {
  id: number;
  titulo: string;
  autor: string;
  precio: string;
  imagen: string;
  descripcion: string;
  destacado: boolean;
};

export const libros: Libro[] = [
  {
    id: 1,
    titulo: "Deja de ser tú",
    autor: "Joe Dispenza",
    precio: "$15.900",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RXJiImQaE2MXBM7haLVJ_XdNu1olqCmeqQ&s",
    descripcion:
      "En este libro, Joe Dispenza combina los campos de la física cuántica, la neurociencia y la biología para mostrarte cómo cambiar tu mente y crear la vida que deseás.",
    destacado: true,
  },
  {
    id: 2,
    titulo: "Historias de diván",
    autor: "Gabriel Rolón",
    precio: "$12.500",
    imagen:
      "https://sbslibreria.vtexassets.com/arquivos/ids/5122700-1200-auto?v=638872526094230000&width=1200&height=auto&aspect=true",
    descripcion:
      "Gabriel Rolón nos abre las puertas de su consultorio y comparte ocho historias reales de pacientes que llegaron a terapia buscando respuestas.",
    destacado: true,
  },
  {
    id: 3,
    titulo: "El placebo eres tú",
    autor: "Joe Dispenza",
    precio: "$16.200",
    imagen:
      "https://sbslibreria.vtexassets.com/arquivos/ids/5704093-1200-auto?v=639120317790930000&width=1200&height=auto&aspect=true",
    descripcion:
      "Joe Dispenza explora el poder de la mente sobre el cuerpo y presenta evidencia científica de cómo los pensamientos y las emociones pueden transformar nuestra biología.",
    destacado: true,
  },
  {
    id: 4,
    titulo: "Encuentros",
    autor: "Gabriel Rolón",
    precio: "$13.800",
    imagen:
      "https://imgs.search.brave.com/0oMKhFkRoDnukTJXrYmdqfbz6isZR0T66cLXPJCqOfc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzY1Mjg4Ny1NTFU3/NjEwMjQxODAwMV8w/NDIwMjQtVi53ZWJw",
    descripcion:
      "Rolón reflexiona sobre el amor, el deseo y los vínculos humanos a partir de relatos clínicos y referencias culturales.",
    destacado: true,
  },
  {
    id: 5,
    titulo: "Hábitos atómicos",
    autor: "James Clear",
    precio: "$14.500",
    imagen:
      "https://http2.mlstatic.com/D_NQ_NP_2X_937573-MLU74994004700_032024-F.webp",
    descripcion:
      "James Clear presenta un sistema probado para construir buenos hábitos y eliminar los malos.",
    destacado: true,
  },
  {
    id: 6,
    titulo: "El club de las 5 de la mañana",
    autor: "Robin Sharma",
    precio: "$11.900",
    imagen:
      "https://http2.mlstatic.com/D_NQ_NP_2X_780462-MLU71630135141_092023-F.webp",
    descripcion:
      "Robin Sharma propone una rutina matutina revolucionaria para maximizar la productividad y alcanzar el bienestar.",
    destacado: true,
  },
];