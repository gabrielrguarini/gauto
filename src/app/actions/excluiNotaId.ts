"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export default async function ExcluiNotaId(id: number) {
  console.log("Exluindo produto: ", id);
  try {
    const produto = await prisma.nota.delete({
      where: {
        id,
      },
    });
    console.log("Cliente excluído: ", produto);
    revalidatePath("/notas");
    return { message: "Nota excluída com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir nota: ", error);
    return { errors: "Erro ao excluir nota" };
  }
}
