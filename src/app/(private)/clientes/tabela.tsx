"use client";

import { AgGridReact, CustomCellRendererProps } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { Cliente } from "@prisma/client";

import { useState } from "react";

import EditaClienteDialog from "@/components/EditaClienteDialog";
import InputPersonalizado from "@/components/ui/inputPersonalizado";
import ExcluiClienteButton from "./excluiClienteButton";

export default function Tabela({ clientes }: { clientes: Cliente[] }) {
  const [rowData] = useState<Cliente[]>(clientes);
  const [colDefs] = useState<ColDef[]>([
    {
      field: "nome",
      headerName: "Nome",
      filter: true,
    },
    { field: "cidade", headerName: "Cidade" },
    { field: "endereco", headerName: "Endereço" },
    {
      field: "telefone",
      headerName: "Telefone",
      cellRenderer: (params: CustomCellRendererProps) => (
        <InputPersonalizado
          value={params.data.telefone}
          type="tel"
          displayType="text"
          renderText={(formattedValue) => {
            return <>{formattedValue}</>;
          }}
        />
      ),
      width: 135,
    },
    {
      headerName: "Editar",
      cellRenderer: (params: CustomCellRendererProps) => (
        <EditaClienteDialog id={params.data.id} />
      ),
      width: 70,
    },
    {
      headerName: "Excluir",
      cellRenderer: (params: CustomCellRendererProps) => (
        <ExcluiClienteButton
          className="text px-1 py-0 h-6"
          id={params.data.id}
        />
      ),
      width: 75,
    },
  ]);

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact rowData={clientes} columnDefs={colDefs} rowHeight={25} />
    </div>
  );
}
