/*
  Warnings:

  - Made the column `dataDeAtualizacao` on table `Nota` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataDeCriacao` on table `Nota` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Nota" ALTER COLUMN "dataDeAtualizacao" SET NOT NULL,
ALTER COLUMN "dataDeCriacao" SET NOT NULL;
