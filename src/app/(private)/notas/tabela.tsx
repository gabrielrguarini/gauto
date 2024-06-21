"use client";

import { AgGridReact } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);
import { Nota } from "@prisma/client";
import { useState } from "react";

interface tabelaProps {
  notas: Nota[];
}

export default function Tabela({ notas }: tabelaProps) {
  const [rowData] = useState<Nota[]>(notas);
  const [colDefs] = useState<ColDef[]>([
    {
      field: "numero",
      headerName: "Número",
      filter: true,
    },
    { field: "clienteId", headerName: "Id do Cliente" },
    { field: "cliente.nome", headerName: "Cliente" },
  ]);

  return (
    <div className="ag-theme-quartz h-full">
      <AgGridReact rowData={rowData} columnDefs={colDefs} rowHeight={25} />
    </div>
  );
}
