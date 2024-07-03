"use server";
import prisma from "@/lib/prisma";
export async function BuscaProdutos() {
  try {
    const todosProdutos = await prisma.produto.findMany({
      include: {
        cliente: true,
        nota: {
          include: {
            cliente: true,
          },
        },
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
