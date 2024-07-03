"use server";
import { Produto } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/prisma";

const CriaNotaSchema = z.object({
  produtos: z.array(
    z.object({
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

export async function CriaNota(
  prevState: any,
  formData: FormData,
  produtos: Produto[]
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
      console.log("Cliente não encontrado ao criar nota");
      return {
        errors: "Cliente não encontrado",
      };
    }
    const criaNota = await prisma.nota.create({
      data: {
        numero: dataValidado.data.numero,
        cliente: {
          connect: {
            id: dataValidado.data.cliente,
          },
        },
        produtos: {
          create: dataValidado.data.produtos.map((produto) => ({
            nome: produto.nome,
            quantidade: produto.quantidade,
            valorDeVenda: produto.valorDeVenda,
            valorDeCompra: produto.valorDeCompra,
            status: produto.status,
            cliente: {
              connect: {
                id: dataValidado.data.cliente,
              },
            },
          })),
        },
      },
    });
    revalidatePath("/notas");
    revalidatePath("/produtos");
    return {
      message: "Nota criada com sucesso",
    };
  } catch (error) {
    console.log("Erro ao criar nota: ", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
