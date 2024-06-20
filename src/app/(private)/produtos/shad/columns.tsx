"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type listaProdutos = {
  nome: string;
  quantidade: number;
  valorDeCompra: number;
  valorDeVenda: number;
  cliente: string;
  status: string | null;
};

export const columns: ColumnDef<listaProdutos>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },
  {
    accessorKey: "valorDeVenda",
    header: "Valor de venda",
  },
  {
    accessorKey: "valorDeCompra",
    header: "Valor de compra",
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "status",
    header: "Status ",
  },
];
