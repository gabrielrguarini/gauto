"use server";
import { BuscaProdutos } from "@/app/actions/buscaProdutos";
import Tabela from "@/app/(private)/produtos/tabela";

export default async function Produtos() {
  const data = await BuscaProdutos();
  return (
    <div className="h-screen w-full relative flex flex-col p-6">
      <h1 className="text-2xl font-bold ml-4">Lista de Produtos</h1>
      <p className="text-lg ml-4">Quantidade de produtos: {data.length}</p>
      <Tabela produtos={data} />
    </div>
  );
}
