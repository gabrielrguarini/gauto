"use server";

export default async function actionFile(formdata: FormData) {
  const file = formdata.get("arquivo");
  if (file) {
    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formdata,
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao enviar arquivo no action: ${response.statusText}`
        );
      }

      console.log("Arquivo enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar arquivo no fetch:", error);
    }
  } else {
    console.error("Nenhum arquivo encontrado para enviar.");
  }
}
