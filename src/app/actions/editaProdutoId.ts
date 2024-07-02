"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateClienteSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  quantidade: z.coerce.number(),
  valorDeVenda: z.coerce.number(),
  valorDeCompra: z.coerce.number(),
  status: z.string().nullable(),
});

export default async function EditaProdutoId(formData: FormData, id: number) {
  try {
    const produtoValidado = CreateClienteSchema.safeParse({
      id,
      nome: formData.get("nome"),
      quantidade: formData.get("quantidade"),
      valorDeVenda: formData.get("valorDeVenda"),
      valorDeCompra: formData.get("valorDeCompra"),
      status: formData.get("status"),
    });
    if (!produtoValidado.success) {
      console.error(produtoValidado.error);
      throw new Error("Dados inválidos");
    }
    const produto = await prisma.produto.findUnique({
      where: {
        id,
      },
    });
    if (produto) {
      const updatedProduto = await prisma.produto.update({
        where: {
          id,
        },
        data: {
          nome: produtoValidado.data.nome,
          quantidade: produtoValidado.data.quantidade,
          valorDeVenda: produtoValidado.data.valorDeVenda,
          valorDeCompra: produtoValidado.data.valorDeCompra,
          status: produtoValidado.data.status,
        },
      });
    }
    revalidatePath("/produtos");
    return { message: "Produto editado com sucesso" };
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar clientes");
  } finally {
    await prisma.$disconnect();
  }
}
