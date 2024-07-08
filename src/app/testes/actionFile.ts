"use server";

import { Produto } from "@prisma/client";

export default async function actionFile(
  prevState: any,
  formData: FormData,
  produtos: Produto[]
) {
  try {
    formData.append("produtos", JSON.stringify(produtos));
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
