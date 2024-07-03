"use server";
import { Produto } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { stringify } from "querystring";

const CriaNotaSchema = z.object({
  produtos: z.array(
    z.object({
      id: z.number().optional(),
      nome: z.string(),
      quantidade: z.coerce.number(),
      valorDeVenda: z.coerce.number(),
      valorDeCompra: z.coerce.number(),
      status: z.string().nullable(),
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
  console.log("produtos", produtos);
  try {
    const dataValidado = CriaNotaSchema.safeParse({
      numero: formData.get("numero"),
      cliente: formData.get("cliente"),
      produtos,
    });
    if (!dataValidado.success) {
      return {
        errors: stringify(dataValidado.error.flatten().fieldErrors),
      };
    }
    const cliente = await prisma.cliente.findUnique({
      where: { id: dataValidado.data.cliente },
    });

    if (!cliente) {
      return {
        errors: "Cliente não encontrado ao editar nota.",
      };
    }

    const existeNota = await prisma.nota.findUnique({
      where: { id: notaId },
      include: { produtos: true },
    });

    if (!existeNota) {
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
