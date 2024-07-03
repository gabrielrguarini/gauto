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
  clienteId: z.coerce.number().nullable(),
});

export default async function EditaProdutoId(formData: FormData, id: number) {
  const valorDeCompra = formData
    .get("valorDeCompra")
    ?.toString()
    .replace("R$ ", "")
    .replace(".", "")
    .replace(",", ".");
  const valorDeVenda = formData
    .get("valorDeVenda")
    ?.toString()
    .replace("R$ ", "")
    .replace(".", "")
    .replace(",", ".");
  try {
    const produtoValidado = CreateClienteSchema.safeParse({
      id,
      nome: formData.get("nome"),
      quantidade: formData.get("quantidade"),
      valorDeVenda: valorDeVenda,
      valorDeCompra: valorDeCompra,
      status: formData.get("status"),
      clienteId: formData.get("clienteId"),
    });
    if (!produtoValidado.success) {
      console.error(produtoValidado.error);
      return { errors: "Erro ao validar dados do produto" };
    }
    const produto = await prisma.produto.findUnique({
      where: {
        id,
      },
    });
    if (produto) {
      if (produto.clienteId !== produtoValidado.data.clienteId) {
        console.log(
          "ClienteId não é igual: ",
          "Formulario:",
          produtoValidado.data.clienteId,
          "Banco de Dados: ",
          produto.clienteId
        );
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
            notaId: null,
            clienteId: produtoValidado.data.clienteId,
          },
        });
      } else {
        console.log("ClienteId é igual");
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
    }
    revalidatePath("/produtos");
    revalidatePath("/notas");
    revalidatePath("/clientes");

    return { message: "Produto editado com sucesso" };
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar clientes");
  }
}
