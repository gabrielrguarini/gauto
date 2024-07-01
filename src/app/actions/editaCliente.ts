"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

const CreateClienteSchema = z.object({
  nome: z
    .string({
      required_error: "É necessário colocar um nome",
      invalid_type_error: "Nome inválido",
    })
    .min(3, "É necessário colocar um nome"),
  cidade: z
    .string({
      invalid_type_error: "Coloque um cidade válida",
    })
    .min(1, "É necessário colocar uma cidade"),
  endereco: z.string({
    invalid_type_error: "Endereço inválida",
  }),
  telefone: z.string({
    invalid_type_error: "Telefone inválido",
  }),
});

export default async function EditaCliente(formData: FormData, id: number) {
  try {
    const formDataValida = CreateClienteSchema.safeParse({
      nome: formData.get("nome"),
      cidade: formData.get("cidade"),
      endereco: formData.get("endereco"),
      telefone: formData.get("telefone"),
    });
    if (!formDataValida.success) {
      console.log(formDataValida.error.flatten().fieldErrors);
      revalidatePath("/");
      return {
        errors: "Formulário inválido",
      };
    }
    const existeCliente = await prisma.cliente.findUnique({
      where: {
        id,
      },
    });
    if (!existeCliente) {
      console.log("Cliente não encontrado");
      revalidatePath("/");

      return {
        message: "Erro ao editar cliente, cliente não encontrado",
      };
    }
    const telefoneSemMascara = formDataValida.data.telefone
      .replace(/\(/, "")
      .replace(/\)/, "")
      .replace(/\-/, "")
      .replace(/ /, "");
    const cliente = await prisma.cliente.update({
      where: {
        id: id,
      },
      data: {
        nome: formDataValida.data.nome,
        cidade: formDataValida.data.cidade,
        endereco: formDataValida.data.endereco,
        telefone: telefoneSemMascara,
      },
    });
    console.log("Cliente atualizado com sucesso ", cliente);
    revalidatePath("/clientes");
    return {
      message: "Cliente atualizado com sucesso!",
    };
  } catch (error) {
    console.log("Erro ao atualizar cliente: ", error);
    throw error;
  }
}
