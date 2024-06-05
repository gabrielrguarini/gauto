"use client";

import { Produto } from "@/components/ui/listaProdutos";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type listaProdutos = {
  nota: { id: number; numero: number; clienteId: number } | null;
} & {
  id: number;
  nome: string;
  quantidade: number;
  valorDeVenda: number;
  valorDeCompra: number;
  notaId: number | null;
  status: string | null;
};

export const columns: ColumnDef<listaProdutos>[] = [
  {
    accessorKey: "nome",
    header: "nome",
  },
  {
    accessorKey: "quantidade",
    header: "quantidade",
  },
  {
    accessorKey: "valorDeVenda",
    header: "valor de venda",
  },
  {
    accessorKey: "valorDeCompra",
    header: "valor de compra",
  },
  {
    accessorKey: "status",
    header: "Status ",
  },
];
