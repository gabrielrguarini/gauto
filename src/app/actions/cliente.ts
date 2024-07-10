"use server";
import { revalidatePath } from "next/cache";

export async function criaCliente(prevState: any, formData: FormData) {
  try {
    const clientes = await fetch("http://localhost:3000/api/cliente", {
      method: "POST",
      body: formData,
    });
    revalidatePath("/clientes");
    if (clientes.status !== 200) {
      return {
        errors: "Erro ao criar cliente",
      };
    }
    return {
      message: "Cliente criado com sucesso!",
    };
  } catch (error) {
    console.log("Erro ao criar cliente: ", error);
    throw error;
  }
}
