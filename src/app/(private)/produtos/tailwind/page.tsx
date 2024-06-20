import { BuscaProdutos } from "@/app/actions/buscaProdutos";
import Tabela from "./tabela";

export default async function Produtos() {
  const colunas = [
    "Nome",
    "Quantidade",
    "Valor de compra",
    "Valor de venda",
    "Cliente",
    "Status",
  ];

  const produtos = await BuscaProdutos();

  if (!produtos) return <div>Carregando...</div>;

  return (
    <div className="p-4">
      <Tabela produtos={produtos} />
    </div>
  );
}
