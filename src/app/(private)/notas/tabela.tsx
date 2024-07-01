"use client";

import { AgGridReact, CustomCellRendererProps } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);
import { Nota } from "@prisma/client";
import { useState } from "react";
import EditarNotaDialog from "@/components/EditaNotaDialog";
import ExcluiNotaButton from "./excluiNotaButton";

export default function Tabela({ notas }: { notas: Nota[] }) {
  const [colDefs] = useState<ColDef[]>([
    {
      field: "numero",
      headerName: "Número",
      filter: true,
    },
    { field: "clienteId", headerName: "Id do Cliente" },
    { field: "cliente.nome", headerName: "Cliente" },
    {
      field: "dataDeCriacao",
      headerName: "Data",
      valueFormatter: (params) => {
        const date = params.value ? new Date(params.value) : null;
        return date ? date.toLocaleDateString() : "Sem Data de Criação";
      },
    },
    {
      field: "editar",
      headerName: "Editar",
      cellRenderer: (params: CustomCellRendererProps) => (
        <EditarNotaDialog id={params.data.id} />
      ),
    },
    {
      headerName: "Excluir",
      cellRenderer: (params: CustomCellRendererProps) => (
        <ExcluiNotaButton className="text px-1 py-0 h-6" id={params.data.id} />
      ),
      width: 75,
    },
  ]);

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact rowData={notas} columnDefs={colDefs} rowHeight={25} />
    </div>
  );
}
