"use client";

import { AgGridReact, CustomCellRendererProps } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  ModuleRegistry,
  ValueFormatterParams,
} from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { useState } from "react";
import { numericFormatter } from "react-number-format";
import ExcluiProdutoButton from "./excluiProdutoButton";
interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  valorDeCompra: number;
  valorDeVenda: number;
  cliente: string;
  status: string | null;
}

export default function Tabela({ produtos }: { produtos: Produto[] }) {
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
      headerName: "Valor de Compra",
      field: "valorDeCompra",
      valueFormatter: (params: ValueFormatterParams) =>
        numericFormatter(`${params.data.valorDeCompra}`, {
          allowLeadingZeros: false,
          decimalScale: 2,
          decimalSeparator: ",",
          thousandSeparator: ".",
          fixedDecimalScale: true,
          prefix: "R$ ",
        }),
      initialWidth: 130,
    },
    {
      headerName: "Valor de Venda",
      valueFormatter: (params: ValueFormatterParams) =>
        numericFormatter(`${params.data.valorDeVenda}`, {
          allowLeadingZeros: false,
          decimalScale: 2,
          decimalSeparator: ",",
          thousandSeparator: ".",
          fixedDecimalScale: true,
          prefix: "R$ ",
        }),
      initialWidth: 130,
    },
    { field: "cliente", headerName: "Cliente" },
    { field: "status", headerName: "Status", initialWidth: 95 },
    {
      headerName: "Custo Total",
      valueFormatter: (params: ValueFormatterParams) =>
        numericFormatter(
          `${params.data.valorDeCompra * params.data.quantidade}`,
          {
            allowLeadingZeros: false,
            decimalScale: 2,
            decimalSeparator: ",",
            thousandSeparator: ".",
            fixedDecimalScale: true,
            prefix: "R$ ",
          }
        ),
      initialWidth: 120,
    },
    {
      headerName: "Venda Total",
      valueFormatter: (params: ValueFormatterParams) =>
        numericFormatter(
          `${params.data.valorDeVenda * params.data.quantidade}`,
          {
            allowLeadingZeros: false,
            decimalScale: 2,
            decimalSeparator: ",",
            thousandSeparator: ".",
            fixedDecimalScale: true,
            prefix: "R$ ",
          }
        ),
      initialWidth: 150,
    },
    {
      headerName: "Lucro Total",
      valueFormatter: (params: ValueFormatterParams) =>
        numericFormatter(
          `${
            (params.data.valorDeVenda - params.data.valorDeCompra) *
            params.data.quantidade
          }`,
          {
            allowLeadingZeros: false,
            decimalScale: 2,
            decimalSeparator: ",",
            thousandSeparator: ".",
            fixedDecimalScale: true,
            prefix: "R$ ",
          }
        ),
      initialWidth: 120,
    },
    {
      headerName: "Excluir",
      cellRenderer: (params: CustomCellRendererProps) => (
        <ExcluiProdutoButton
          className="text px-1 py-0 h-6"
          id={params.data.id}
        />
      ),
      width: 75,
    },
  ]);

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact rowData={produtos} columnDefs={colDefs} rowHeight={25} />
    </div>
  );
}
