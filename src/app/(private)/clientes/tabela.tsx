"use client";

import { AgGridReact } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { Cliente } from "@prisma/client";

import { useState } from "react";

import EditaClienteDialog from "@/components/EditaClienteDialog";

interface tabelaProps {
  clientes: Cliente[];
}

export default function Tabela({ clientes }: tabelaProps) {
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
      valueFormatter: (params) =>
        params.value
          .replace(/\D/g, "")
          .replace(/^(\d{2})(\d)/g, "($1) $2")
          .replace(/(\d{4,5})(\d{4})/g, "$1 - $2"),
    },
    {
      field: "telefone",
      headerName: "Editar",
      cellRenderer: (params: any) => <EditaClienteDialog id={params.data.id} />,
    },
  ]);

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact rowData={rowData} columnDefs={colDefs} rowHeight={25} />
    </div>
  );
}
