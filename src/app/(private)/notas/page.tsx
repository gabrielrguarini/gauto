"use server";
import { FileBox } from "lucide-react";
import Tabela from "./tabela";
import buscaNotas from "@/app/actions/buscaNotas";
import CriarNotaDialog from "@/components/CriarNotaDialog";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import EditarNotaDialog from "@/components/EditaNotaDialog";

export default async function Notas() {
  const data = await buscaNotas();
  return (
    <div className="h-screen w-full relative flex flex-col p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center text-2xl font-bold ml-4 gap-2">
            Notas
            <FileBox />
          </h1>
          <p className="text-lg ml-4">
            Notas cadastradas:{" "}
            <Suspense fallback={"Carregando..."}>{data.length}</Suspense>
          </p>
        </div>
        <Suspense fallback={<Button disabled>Carregando...</Button>}>
          <CriarNotaDialog />
        </Suspense>
      </div>
      <Suspense fallback={<h1>Carregando...</h1>}>
        <Tabela notas={data} />
      </Suspense>
    </div>
  );
}
