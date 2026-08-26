import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.libro.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.autor.deleteMany();

  const autores = [
    { nombre: "Joe Dispenza", nacionalidad: "Estados Unidos" },
    { nombre: "Gabriel Rolon", nacionalidad: "Argentina" },
    { nombre: "James Clear", nacionalidad: "Estados Unidos" },
    { nombre: "Robin Sharma", nacionalidad: "Canada" },
  ];

  const categorias = [
    { nombre: "Bienestar" },
    { nombre: "Psicologia" },
    { nombre: "Productividad" },
  ];

  const libros = [
    { titulo: "Deja de ser tu", autor: "Joe Dispenza", precio: 15900, imagen: "https://ejemplo.com/deja-de-ser-tu.jpg", descripcion: "Una guia para cambiar la mente y crear una nueva realidad.", destacado: true, disponible: true, categorias: ["Bienestar", "Psicologia"] },
    { titulo: "Historias de divan", autor: "Gabriel Rolon", precio: 12500, imagen: "https://ejemplo.com/historias-de-divan.jpg", descripcion: "Ocho historias del consultorio que exploran el mundo emocional.", destacado: true, disponible: true, categorias: ["Psicologia"] },
    { titulo: "Habitos atomicos", autor: "James Clear", precio: 14500, imagen: "https://ejemplo.com/habitos-atomicos.jpg", descripcion: "Un metodo practico para construir buenos habitos.", destacado: true, disponible: true, categorias: ["Productividad", "Bienestar"] },
  ];

  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, categorias: nombresCategorias, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: nombresCategorias.map((nombre) => ({ nombre })) },
      },
    });
  }
}

main()
  .then(() => console.log("Seed completado"))
  .catch((error) => { console.error(error); process.exit(1); })
  .finally(() => prisma.$disconnect());
