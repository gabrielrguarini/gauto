/*
  Warnings:

  - You are about to drop the column `arquivoURL` on the `Nota` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nota" DROP COLUMN "arquivoURL",
ADD COLUMN     "arquivosURLs" TEXT[];
