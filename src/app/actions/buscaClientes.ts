"use server";
import prisma from "@/lib/prisma";
export async function BuscaClientes() {
  try {
    const todosClientes = await prisma.cliente.findMany({
      orderBy: {
        nome: "asc",
      },
    });
    return todosClientes;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar clientes");
  } finally {
    await prisma.$disconnect();
  }
}
