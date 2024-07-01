"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export default async function ExcluiClienteId(id: number) {
  console.log("Exluindo cliente: ", id);
  try {
    const Desvinculadas = await prisma.nota.updateMany({
      where: {
        clienteId: id,
      },
      data: {
        clienteId: null,
        // Desvincula o cliente das notas
      },
    });
    console.log("Desvinculadas: ", Desvinculadas);
    const cliente = await prisma.cliente.delete({
      where: {
        id: id,
      },
    });
    console.log("Cliente excluído: ", cliente);
    revalidatePath("/clientes");
    return cliente;
  } catch (error) {
    console.error("Erro ao excluir cliente: ", error);
    return { errors: "Erro ao excluir cliente" };
  }
}
