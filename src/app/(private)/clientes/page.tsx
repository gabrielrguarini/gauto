"use server";
import Tabela from "./tabela";
import { BuscaClientes } from "../../actions/buscaClientes";

export default async function Clientes() {
  const data = await BuscaClientes();
  return (
    <div className="h-screen w-full relative flex flex-col p-6">
      <h1 className="text-2xl font-bold ml-4">Lista de Clientes</h1>
      <p className="text-lg ml-4">
        Quantidade clientes cadastrados: {data.length}
      </p>
      <Tabela clientes={data} />
    </div>
  );
}
