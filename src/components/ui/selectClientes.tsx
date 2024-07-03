"use server";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cliente } from "@prisma/client";

export default async function SelectClientes({
  todosClientes,
  cliente,
}: {
  todosClientes: Cliente[];
  cliente?: string;
}) {
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
}
