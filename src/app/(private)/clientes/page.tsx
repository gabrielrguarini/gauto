"use server";
import Tabela from "./tabela";
import { BuscaClientes } from "../../actions/buscaClientes";
import { User } from "lucide-react";
import CriarClienteDialog from "@/components/CriarClienteDialog";

export default async function Clientes() {
  const data = await BuscaClientes();
  return (
    <div className="h-screen w-full relative flex flex-col p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center text-2xl font-bold ml-4 gap-2">
            Clientes <User />
          </h1>
          <p className="text-lg ml-4">Clientes cadastrados: {data.length}</p>
        </div>
        <CriarClienteDialog />
      </div>

      <Tabela clientes={data} />
    </div>
  );
}
