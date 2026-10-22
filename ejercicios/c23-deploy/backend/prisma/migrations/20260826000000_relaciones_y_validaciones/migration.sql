ALTER TABLE "Autor" ADD CONSTRAINT "Autor_nombre_key" UNIQUE ("nombre");

ALTER TABLE "Libro"
  DROP COLUMN "autor",
  ALTER COLUMN "precio" TYPE INTEGER USING NULLIF(regexp_replace("precio", '[^0-9]', '', 'g'), '')::INTEGER,
  ADD COLUMN "autorId" INTEGER NOT NULL;

CREATE TABLE "Categoria" (
  "id" SERIAL NOT NULL,
  "nombre" TEXT NOT NULL,
  CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "_CategoriaToLibro" (
  "A" INTEGER NOT NULL,
  "B" INTEGER NOT NULL,
  CONSTRAINT "_CategoriaToLibro_AB_pkey" PRIMARY KEY ("A", "B")
);

CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");
CREATE INDEX "_CategoriaToLibro_B_index" ON "_CategoriaToLibro"("B");

ALTER TABLE "Libro"
  ADD CONSTRAINT "Libro_autorId_fkey"
  FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "_CategoriaToLibro"
  ADD CONSTRAINT "_CategoriaToLibro_A_fkey"
  FOREIGN KEY ("A") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_CategoriaToLibro"
  ADD CONSTRAINT "_CategoriaToLibro_B_fkey"
  FOREIGN KEY ("B") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
