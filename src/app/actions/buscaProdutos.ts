"use server";
import { PrismaClient } from "@prisma/client";
export async function BuscaProdutos() {
  const prisma = new PrismaClient();
  try {
    const todosProdutos = await prisma.produto.findMany({
      include: {
        nota: true,
      },
      orderBy: {
        nome: "asc",
      },
    });
    return todosProdutos;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar produtos");
  } finally {
    await prisma.$disconnect();
  }
}
