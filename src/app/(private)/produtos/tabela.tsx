"use client";

import { AgGridReact } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { useState } from "react";

interface Produto {
  nome: string;
  quantidade: number;
  valorDeCompra: number;
  valorDeVenda: number;
  cliente: string;
  status: string | null;
}

interface tabelaProps {
  produtos: Produto[];
}

export default function Tabela({ produtos }: tabelaProps) {
  const [rowData] = useState<Produto[]>(produtos);
  const [colDefs] = useState<ColDef[]>([
    {
      field: "nome",
      headerName: "Nome",
      filter: true,
    },
    { field: "quantidade", headerName: "Quantidade" },
    { field: "valorDeCompra", headerName: "Valor de Compra" },
    { field: "valorDeVenda", headerName: "Valor de Venda" },
    { field: "cliente", headerName: "Cliente" },
    { field: "status", headerName: "Status" },
  ]);

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact rowData={rowData} columnDefs={colDefs} rowHeight={25} />
    </div>
  );
}
