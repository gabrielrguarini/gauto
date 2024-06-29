"use server";
import { Produto } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/prisma";

const CriaNotaSchema = z.object({
  produtos: z.array(
    z.object({
      id: z.number().optional(),
      nome: z.string(),
      quantidade: z.coerce.number(),
      valorDeVenda: z.coerce.number(),
      valorDeCompra: z.coerce.number(),
      status: z.string(),
    })
  ),
  numero: z.coerce.number(),
  cliente: z.coerce.number(),
});

export async function EditaNota(
  prevState: any,
  formData: FormData,
  produtos: Produto[],
  notaId: number
) {
  try {
    const dataValidado = CriaNotaSchema.safeParse({
      numero: formData.get("numero"),
      cliente: formData.get("cliente"),
      produtos,
    });
    if (!dataValidado.success) {
      console.log(dataValidado.error.flatten().fieldErrors);
      return {
        errors: "Formulário inválido",
      };
    }
    const cliente = await prisma.cliente.findUnique({
      where: { id: dataValidado.data.cliente },
    });

    if (!cliente) {
      console.log("Cliente não encontrado ao editar nota");
      return {
        errors: "Cliente não encontrado",
      };
    }

    const existeNota = await prisma.nota.findUnique({
      where: { id: notaId },
      include: { produtos: true },
    });

    if (!existeNota) {
      console.log("Nota não encontrada ao editar");
      return {
        errors: "Nota não encontrada",
      };
    }

    const updatedNota = await prisma.nota.update({
      where: { id: notaId },
      data: {
        numero: dataValidado.data.numero,
        cliente: {
          connect: {
            id: dataValidado.data.cliente,
          },
        },
      },
    });

    const updatePromises = dataValidado.data.produtos.map(async (produto) => {
      if (produto.id) {
        return prisma.produto.update({
          where: { id: produto.id },
          data: {
            nome: produto.nome,
            quantidade: produto.quantidade,
            valorDeVenda: produto.valorDeVenda,
            valorDeCompra: produto.valorDeCompra,
            status: produto.status,
          },
        });
      } else {
        return prisma.produto.create({
          data: {
            nome: produto.nome,
            quantidade: produto.quantidade,
            valorDeVenda: produto.valorDeVenda,
            valorDeCompra: produto.valorDeCompra,
            status: produto.status,
            nota: {
              connect: { id: notaId },
            },
          },
        });
      }
    });

    await Promise.all(updatePromises);

    revalidatePath("/notas");
    revalidatePath("/produtos");
    return {
      message: "Nota editada com sucesso",
    };
  } catch (error) {
    console.log("Erro ao editar nota: ", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
