import { signIn } from "@/auth";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const Loginschema = z.object({
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
});

export async function LogaUsuario(formData: FormData) {
  "use server";
  const formDataValidado = Loginschema.safeParse({
    email: formData.get("email"),
    senha: formData.get("senha"),
  });
  if (!formDataValidado.success) {
    console.log(formDataValidado.error.flatten().fieldErrors);
    return {
      errors: formDataValidado.error.flatten().fieldErrors,
    };
  }
  await signIn("credentials", {
    ...formDataValidado.data,
    redirect: false,
    callbackUrl: "/",
  });
  redirect("/");
}
