-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "clienteId" INTEGER;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
