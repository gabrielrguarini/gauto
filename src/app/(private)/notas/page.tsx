"use server";
import { FileBox } from "lucide-react";
import Tabela from "./tabela";
import buscaNotas from "@/app/actions/buscaNotas";

export default async function Notas() {
  const data = await buscaNotas();
  return (
    <div className="h-screen w-full relative flex flex-col p-6">
      <h1 className="flex items-center text-2xl font-bold ml-4 gap-2">
        Notas
        <FileBox />
      </h1>
      <p className="text-lg ml-4">
        Quantidade de notas cadastradas: {data.length}
      </p>
      <Tabela notas={data} />
    </div>
  );
}
