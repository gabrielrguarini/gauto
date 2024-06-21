"use client";

import { AgGridReact } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { useState } from "react";
import { converteMoeda } from "@/lib/utils";
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
    {
      field: "quantidade",
      headerName: "Quantidade",
      initialWidth: 70,
    },
    {
      field: "valorDeCompra",
      valueFormatter: (params) => converteMoeda(params.value),
      headerName: "Valor de Compra",
      initialWidth: 130,
    },
    {
      field: "valorDeVenda",
      valueFormatter: (params) => converteMoeda(params.value),
      headerName: "Valor de Venda",
      initialWidth: 130,
    },
    { field: "cliente", headerName: "Cliente" },
    { field: "status", headerName: "Status", initialWidth: 95 },
    {
      headerName: "Custo Total",
      valueFormatter: (params) =>
        converteMoeda(params.data.valorDeCompra * params.data.quantidade),
      initialWidth: 120,
    },
    {
      headerName: "Venda Total",
      valueFormatter: (params) =>
        converteMoeda(params.data.valorDeVenda * params.data.quantidade),
      initialWidth: 150,
    },
    {
      headerName: "Lucro Total",
      valueFormatter: (params) =>
        converteMoeda(
          (params.data.valorDeVenda - params.data.valorDeCompra) *
            params.data.quantidade
        ),
      initialWidth: 120,
    },
  ]);

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact rowData={rowData} columnDefs={colDefs} rowHeight={25} />
    </div>
  );
}
