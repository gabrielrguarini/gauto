import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const formDataValidade = CreateClienteSchema.safeParse({
    nome: formData.get("nome"),
    cidade: formData.get("cidade"),
    endereco: formData.get("endereco"),
    telefone: formData.get("telefone"),
  });
  if (!formDataValidade.success) {
    console.log(formDataValidade.error.flatten().fieldErrors);
    revalidatePath("/");
    return NextResponse.json({
      errors: "Formulário inválido",
    });
  }
  const existeCliente = await prisma.cliente.findFirst({
    where: {
      nome: formDataValidade.data.nome,
    },
  });
  if (existeCliente) {
    console.log("Cliente já cadastrado");
    revalidatePath("/");
    return NextResponse.json({
      message: "Cliente já cadastrado",
    });
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
  revalidatePath("/clientes");
  return NextResponse.json({
    message: "Cliente criado com sucesso!",
  });
}
