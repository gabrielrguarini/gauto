"use server";

import { BuscaClientes } from "@/app/actions/buscaClientes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export default async function SelectClientes() {
  try {
    const todosClientes = await BuscaClientes();
    if (todosClientes.length === 0) return null;
    return (
      <Select name="cliente">
        <SelectTrigger className="">
          <SelectValue placeholder="Cliente*" />
        </SelectTrigger>
        <SelectContent>
          {todosClientes.map((cliente) => (
            <SelectItem key={cliente.id} value={`${cliente.id}`}>
              {cliente.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  } catch (err) {
    console.log(err);
  }
}
