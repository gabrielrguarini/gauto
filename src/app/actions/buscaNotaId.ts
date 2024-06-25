"use server";
import prisma from "@/lib/prisma";
export default async function BuscaNotaId(id: number) {
  try {
    const nota = await prisma.nota.findUnique({
      where: {
        id: id,
      },
      include: {
        cliente: true,
        produtos: true,
      },
    });
    return nota;
  } catch (error) {
    throw new Error("Erro ao buscar cliente por ID");
  } finally {
    await prisma.$disconnect();
  }
}
