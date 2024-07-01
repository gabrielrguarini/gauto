"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export default async function ExcluiProdutoId(id: number) {
  console.log("Exluindo produto: ", id);
  try {
    const produto = await prisma.produto.delete({
      where: {
        id,
      },
    });
    console.log("Cliente excluído: ", produto);
    revalidatePath("/produtos");
    return { message: "Produto excluído com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir produto: ", error);
    return { errors: "Erro ao excluir produto" };
  }
}
