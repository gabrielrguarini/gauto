"use client";

import { AgGridReact, CustomCellRendererProps } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  ModuleRegistry,
  RowClassParams,
  ValueFormatterParams,
} from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { useState } from "react";
import { numericFormatter } from "react-number-format";
import ExcluiProdutoButton from "./excluiProdutoButton";
import EditaProdutoDialog from "@/components/EditaProdutoDialog";
import { Produto } from "@prisma/client";

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
      valueGetter: (params) => {
        return params.data.valorDeCompra;
      },
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
      valueGetter: (params) => {
        return params.data.valorDeVenda;
      },
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
    {
      field: "cliente.nome",
      headerName: "Cliente",
      filter: true,
      valueFormatter: (params: ValueFormatterParams) => {
        return (
          params.data.cliente?.nome ??
          params.data.nota?.cliente?.nome ??
          "Sem Cliente"
        );
      },
    },
    { field: "status", headerName: "Status", initialWidth: 95, filter: true },
    {
      headerName: "Custo Total",
      valueGetter: (params) => {
        return params.data.valorDeCompra * params.data.quantidade;
      },
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
      valueGetter: (params) => {
        return params.data.valorDeVenda * params.data.quantidade;
      },
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
      valueGetter: (params) => {
        return (
          (params.data.valorDeVenda - params.data.valorDeCompra) *
          params.data.quantidade
        );
      },
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
      headerName: "Editar",
      cellRenderer: (params: CustomCellRendererProps) => (
        <EditaProdutoDialog
          id={params.data.id}
          nome={params.data.nome}
          quantidade={params.data.quantidade}
          valorDeVenda={params.data.valorDeVenda}
          valorDeCompra={params.data.valorDeCompra}
          status={params.data.status}
          clienteId={params.data.clienteId ?? params.data.nota?.clienteId}
        />
      ),
      width: 75,
      filter: false,
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
      filter: false,
    },
  ]);
  const getRowClass = (params: RowClassParams) => {
    switch (params.data.status) {
      case "comprado":
        return "!bg-green-200 !text-green-900";
      case "cotado":
        return "!bg-yellow-200 !text-yellow-900 font-medium";
      case "estoque":
        return "!bg-stone-300 !text-orange-500 font-medium";
      case "entregue":
        return "!bg-green-200 !text-green-900 font-medium";
      default:
        return "";
    }
  };

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact
        rowData={produtos}
        columnDefs={colDefs}
        rowHeight={25}
        getRowClass={getRowClass}
      />
    </div>
  );
}
