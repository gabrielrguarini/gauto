"use server";
import prisma from "@/lib/prisma";
export default async function buscaClienteId(id: number) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: id,
      },
    });
    return cliente;
  } catch (error) {
    throw new Error("Erro ao buscar cliente por ID");
  } finally {
    await prisma.$disconnect();
  }
}
