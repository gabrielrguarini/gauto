import { PrismaClient } from "@prisma/client";

export default async function buscaNotas() {
  try {
    const prisma = new PrismaClient();
    const todasNotas = await prisma.nota.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        cliente: true,
      },
    });
    prisma.$disconnect();
    return todasNotas;
  } catch (error) {
    console.error(error);
    prisma.$disconnect();
    throw new Error("Erro ao buscar notas");
  }
}
