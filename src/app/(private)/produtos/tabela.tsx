"use client";

import { AgGridReact, CustomCellRendererProps } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { useState } from "react";
import { converteMoeda } from "@/lib/utils";
import InputPersonalizado from "@/components/ui/inputPersonalizado";
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
      cellRenderer: (params: CustomCellRendererProps) => (
        <InputPersonalizado
          moeda
          value={params.data.valorDeCompra}
          displayType="text"
          renderText={(formattedValue) => {
            return <>{formattedValue}</>;
          }}
        />
      ),
      headerName: "Valor de Compra",
      initialWidth: 130,
    },
    {
      field: "valorDeVenda",
      cellRenderer: (params: CustomCellRendererProps) => (
        <InputPersonalizado
          moeda
          value={params.data.valorDeVenda}
          displayType="text"
          renderText={(formattedValue) => {
            return <>{formattedValue}</>;
          }}
        />
      ),
      headerName: "Valor de Venda",
      initialWidth: 130,
    },
    { field: "cliente", headerName: "Cliente" },
    { field: "status", headerName: "Status", initialWidth: 95 },
    {
      headerName: "Custo Total",
      cellRenderer: (params: CustomCellRendererProps) => (
        <InputPersonalizado
          moeda
          value={params.data.valorDeCompra * params.data.quantidade}
          displayType="text"
          renderText={(formattedValue) => {
            return <>{formattedValue}</>;
          }}
        />
      ),
      initialWidth: 120,
    },
    {
      headerName: "Venda Total",
      cellRenderer: (params: CustomCellRendererProps) => (
        <InputPersonalizado
          moeda
          value={params.data.valorDeVenda * params.data.quantidade}
          displayType="text"
          renderText={(formattedValue) => {
            return <>{formattedValue}</>;
          }}
        />
      ),
      initialWidth: 150,
    },
    {
      headerName: "Lucro Total",
      cellRenderer: (params: CustomCellRendererProps) => (
        <InputPersonalizado
          moeda
          value={
            (params.data.valorDeVenda - params.data.valorDeCompra) *
            params.data.quantidade
          }
          displayType="text"
          renderText={(formattedValue) => {
            return <>{formattedValue}</>;
          }}
        />
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
