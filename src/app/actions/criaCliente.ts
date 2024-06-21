"use server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

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

export default async function criaCliente(prevState: any, formData: FormData) {
  console.log(formData.get("telefone"));
  try {
    const formDataValidade = CreateClienteSchema.safeParse({
      nome: formData.get("nome"),
      cidade: formData.get("cidade"),
      endereco: formData.get("endereco"),
      telefone: formData.get("telefone"),
    });
    if (!formDataValidade.success) {
      console.log(formDataValidade.error.flatten().fieldErrors);
      revalidatePath("/");
      return {
        errors: "Formulário inválido",
      };
    }
    const existeCliente = await prisma.cliente.findFirst({
      where: {
        nome: formDataValidade.data.nome,
      },
    });
    if (existeCliente) {
      console.log("Cliente já cadastrado");
      revalidatePath("/");

      return {
        message: "Cliente já cadastrado",
      };
    }
    const cliente = await prisma.cliente.create({
      data: {
        nome: formDataValidade.data.nome,
        cidade: formDataValidade.data.cidade,
        endereco: formDataValidade.data.endereco,
        telefone: formDataValidade.data.telefone,
      },
    });
    console.log("Cliente criado com sucesso! ", cliente);
    return {
      message: "Cliente criado com sucesso!",
    };
  } catch (error) {
    console.log("Erro ao criar cliente: ", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
