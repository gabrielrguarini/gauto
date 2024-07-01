-- DropForeignKey
ALTER TABLE "Nota" DROP CONSTRAINT "Nota_clienteId_fkey";

-- AlterTable
ALTER TABLE "Nota" ALTER COLUMN "clienteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
