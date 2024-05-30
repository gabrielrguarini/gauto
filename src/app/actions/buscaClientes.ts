"use server";
import { PrismaClient } from "@prisma/client";
export async function BuscaClientes() {
  const prisma = new PrismaClient();
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
  }
}
