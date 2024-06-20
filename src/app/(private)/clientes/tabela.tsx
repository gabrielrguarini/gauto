"use client";

import { AgGridReact } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { Cliente } from "@prisma/client";

import { useState } from "react";

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
    { field: "telefone", headerName: "Telefone" },
  ]);

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact rowData={rowData} columnDefs={colDefs} rowHeight={25} />
    </div>
  );
}
