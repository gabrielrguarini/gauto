"use server";
const bcrypt = require("bcryptjs");

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const CreateUserschema = z.object({
  email: z
    .string({
      required_error: "É necessário colocar um email",
      invalid_type_error: "Email inválido",
    })
    .min(1, "É necessário colocar um email")
    .email("Email inválido"),
  senha: z
    .string({
      invalid_type_error: "Senha inválida",
    })
    .min(1, "É necessário colocar uma senha")
    .min(5),
  senha2: z
    .string({
      invalid_type_error: "Senha inválida",
    })
    .min(1, "É necessário colocar uma senha")
    .min(5),
});

export async function CriaUsuario(formData: FormData) {
  try {
    const formDataValidado = CreateUserschema.safeParse({
      email: formData.get("email"),
      senha: formData.get("senha"),
      senha2: formData.get("senha2"),
    });
    if (!formDataValidado.success) {
      console.log(
        formDataValidado.error.flatten().fieldErrors,
        "Erro nos dados passados: ",
        formData.get("email"),
        formData.get("senha"),
        formData.get("senha2")
      );
      return {
        errors: formDataValidado.error.flatten().fieldErrors,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: formDataValidado.data.email,
      },
    });
    if (user) {
      return { message: "Usuário já existe" };
    }
    await bcrypt.hash(
      formDataValidado.data.senha,
      10,
      async function (err: string, hash: string) {
        if (err) {
          console.log(err);
        }
        const usuario = await prisma.user.create({
          data: {
            email: formDataValidado.data.email,
            senha: hash,
          },
        });
        console.log({ message: "Usuário criado com sucesso", usuario });
        await signIn("credentials", {
          ...formDataValidado.data,
          redirect: false,
          callbackUrl: "/",
        });
        redirect("/");
      }
    );
    return;
  } catch (error) {
    console.log(error, "Erro ao criar usuário");
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
