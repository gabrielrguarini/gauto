import { columns, listaProdutos } from "./columns";
import { DataTable } from "./data-table";

import { BuscaProdutos } from "@/app/actions/buscaProdutos";

export default async function Produtos() {
  const data = await BuscaProdutos();

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
