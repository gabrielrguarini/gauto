"use server";
import Tabela from "./tabela";
import buscaNotas from "@/app/actions/buscaNotas";

export default async function Notas() {
  const data = await buscaNotas();
  return (
    <div className="h-screen w-full relative flex flex-col p-6">
      <h1 className="text-2xl font-bold ml-4">Lista de Produtos</h1>
      <p className="text-lg ml-4">Quantidade de produtos: {data.length}</p>
      <Tabela notas={data} />
    </div>
  );
}
