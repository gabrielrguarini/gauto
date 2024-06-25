"use server";
import { BuscaProdutos } from "@/app/actions/buscaProdutos";
import Tabela from "@/app/(private)/produtos/tabela";
import { Box } from "lucide-react";
import { Suspense } from "react";

export default async function Produtos() {
  const data = await BuscaProdutos();
  return (
    <div className="h-screen  w-full relative flex flex-col p-6">
      <h1 className="flex items-center text-2xl font-bold ml-4 gap-2">
        Produtos <Box />
      </h1>
      <p className="flex text-lg ml-4">Quantidade de produtos: {data.length}</p>
      <Suspense fallback={<h1>Carregando...</h1>}>
        <Tabela produtos={data} />
      </Suspense>
    </div>
  );
}
