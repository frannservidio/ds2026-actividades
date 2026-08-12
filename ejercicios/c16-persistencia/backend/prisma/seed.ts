import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();

  await prisma.autor.createMany({ data: [
    { nombre: "Joe Dispenza", nacionalidad: "Estadounidense" },
    { nombre: "Gabriel Rolon", nacionalidad: "Argentina" },
    { nombre: "James Clear", nacionalidad: "Estadounidense" },
    { nombre: "Robin Sharma", nacionalidad: "Canadiense" },
  ] });

  await prisma.libro.createMany({ data: [
    { titulo: "Deja de ser tu", autor: "Joe Dispenza", precio: "$15.900", imagen: "https://ejemplo.com/deja-de-ser-tu.jpg", descripcion: "Una guia para cambiar la mente y crear una nueva realidad.", destacado: true, disponible: true },
    { titulo: "Historias de divan", autor: "Gabriel Rolon", precio: "$12.500", imagen: "https://ejemplo.com/historias-de-divan.jpg", descripcion: "Ocho historias del consultorio que exploran el mundo emocional.", destacado: true, disponible: true },
    { titulo: "Habitos atomicos", autor: "James Clear", precio: "$14.500", imagen: "https://ejemplo.com/habitos-atomicos.jpg", descripcion: "Un metodo practico para construir buenos habitos.", destacado: true, disponible: true },
  ] });
}

main()
  .then(() => console.log("Seed completado"))
  .catch((error) => { console.error(error); process.exit(1); })
  .finally(() => prisma.$disconnect());
