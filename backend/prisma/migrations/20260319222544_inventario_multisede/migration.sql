/*
  Warnings:

  - You are about to drop the column `stock` on the `Producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "stock";

-- CreateTable
CREATE TABLE "InventarioSede" (
    "id" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "productoId" TEXT NOT NULL,
    "sedeId" TEXT NOT NULL,

    CONSTRAINT "InventarioSede_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventarioSede_productoId_sedeId_key" ON "InventarioSede"("productoId", "sedeId");

-- AddForeignKey
ALTER TABLE "InventarioSede" ADD CONSTRAINT "InventarioSede_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioSede" ADD CONSTRAINT "InventarioSede_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
