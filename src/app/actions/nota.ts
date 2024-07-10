"use server";

import { Produto } from "@prisma/client";

export async function criaNota(
  prevState: any,
  formData: FormData,
  produtos?: Produto[]
) {
  try {
    if (produtos) {
      formData.append("produtos", JSON.stringify(produtos));
    }
    const file = formData.get("arquivo") as File;
    if (file.size === 0) {
      formData.delete("arquivo");
    }
    const response = await fetch("http://localhost:3000/api/nota", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao fazer fetch em /api/nota: ${response.statusText}`
      );
    }
    return prevState;
  } catch (error) {
    console.error("Erro ao fazer fetch em /api/nota:", error);
  }
}
