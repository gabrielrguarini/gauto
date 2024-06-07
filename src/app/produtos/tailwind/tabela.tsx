"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
  const colunas = [
    "Nome",
    "Quantidade",
    "Valor de compra",
    "Valor de venda",
    "Cliente",
    "Status",
  ];

  const [inputs, setInputs] = useState({
    nome: "",
    cliente: "",
  });

  const produtoNomeFiltrado = produtos.filter((produto) => {
    const nome = produto.nome
      .toLowerCase()
      .includes(inputs.nome.toLowerCase().trim());
    const cliente = produto.cliente
      .toLowerCase()
      .includes(inputs.cliente.toLowerCase().trim());
    return nome && cliente;
  });

  return (
    <div className="p-8">
      <div className="border-2 border-gray-200 rounded-lg">
        <table className=" w-full divide-y-2 border-2 border-gray-200 overflow-hidden rounded-lg">
          <thead>
            <tr className="text-left divide-x-2">
              {colunas.map((coluna, index) => {
                if (coluna === "Nome") {
                  return (
                    <th key={index}>
                      {coluna}{" "}
                      <Input
                        placeholder="Digite o nome do produto"
                        value={inputs.nome}
                        onChange={(e) =>
                          setInputs({ ...inputs, nome: e.target.value })
                        }
                      />
                    </th>
                  );
                } else if (coluna === "Cliente") {
                  return (
                    <th key={index}>
                      {coluna}
                      <Input
                        placeholder="Digite o nome do cliente"
                        value={inputs.cliente}
                        onChange={(e) =>
                          setInputs({ ...inputs, cliente: e.target.value })
                        }
                      />
                    </th>
                  );
                } else {
                  return <th key={index}>{coluna}</th>;
                }
              })}
            </tr>
          </thead>
          <tbody className="divide-y-2">
            {produtoNomeFiltrado.map((produto, index) => (
              <tr className="divide-x-2" key={index}>
                <td>{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>
                  {produto.valorDeCompra.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {produto.valorDeVenda.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{produto.cliente}</td>
                <td>{produto.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
