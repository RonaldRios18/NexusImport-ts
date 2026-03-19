/*
  Warnings:

  - The `estado` column on the `Pedido` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `categoria` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'INACTIVO', 'BLOQUEADO');

-- CreateEnum
CREATE TYPE "EstadoEmpleado" AS ENUM ('ACTIVO', 'VACACIONES', 'LICENCIA', 'DESPEDIDO', 'RENUNCIADO');

-- CreateEnum
CREATE TYPE "EstadoProducto" AS ENUM ('ACTIVO', 'AGOTADO', 'DESCONTINUADO', 'EN_TRANSITO');

-- CreateEnum
CREATE TYPE "EstadoPedido" AS ENUM ('PENDIENTE', 'PAGADO', 'EN_PREPARACION', 'ENVIADO', 'ENTREGADO', 'CANCELADO', 'DEVOLUCION');

-- AlterTable
ALTER TABLE "Empleado" ADD COLUMN     "estado" "EstadoEmpleado" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoPedido" NOT NULL DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "categoria",
ADD COLUMN     "categoriaId" TEXT NOT NULL,
ADD COLUMN     "estado" "EstadoProducto" NOT NULL DEFAULT 'ACTIVO',
ADD COLUMN     "imagen" TEXT;

-- AlterTable
ALTER TABLE "Proveedor" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Sede" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO';

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
