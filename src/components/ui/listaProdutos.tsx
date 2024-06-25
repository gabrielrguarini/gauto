"use client";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import SelectStatus from "./selectStatus";
import { Produto } from "@prisma/client";

interface ProdutoProps {
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export default function ListaProdutos({ produtos, setProdutos }: ProdutoProps) {
  const [dados, setDados] = useState({
    id: 0,
    nome: "",
    quantidade: 0,
    valorDeVenda: 0,
    valorDeCompra: 0,
    status: "",
    notaId: 0,
  });

  const adicionarProduto = (produto: Produto) => {
    setProdutos([...produtos, produto]);
    console.log(produtos);
  };

  const removerProduto = (index: number) => {
    setProdutos(produtos.filter((_, i) => i !== index));
  };
  return (
    <div>
      <div className="flex flex-col gap-1 max-h-96 overflow-y-auto">
        <table>
          <thead>
            <tr className="text-left  border-y-2">
              <th className="py-2">Nome</th>
              <th>Quantidade</th>
              <th>Valor de venda</th>
              <th>Valor de compra</th>
              <th>Status</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, index) => (
              <tr className="border" key={index}>
                <td className="">{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>
                  {`${Number(produto.valorDeVenda).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}`}{" "}
                </td>
                <td>
                  {`${Number(produto.valorDeCompra).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}`}{" "}
                </td>
                <td>{produto.status}</td>
                <td className="flex justify-center p-2">
                  <Button
                    variant={"destructive"}
                    onClick={() => removerProduto(index)}
                    size={"sm"}
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex">
        <Input
          type="text"
          placeholder="Nome do produto"
          onChange={(e) => setDados({ ...dados, nome: e.target.value })}
          value={dados.nome}
        />
        <Input
          placeholder="Quantidade"
          onChange={(e) =>
            setDados({ ...dados, quantidade: Number(e.target.value) })
          }
          value={dados.quantidade}
          type="number"
          step="1"
          min="1"
        />
        <Input
          placeholder="Valor de venda"
          onChange={(e) =>
            setDados({ ...dados, valorDeVenda: Number(e.target.value) })
          }
          value={dados.valorDeVenda}
          type="number"
          step="0.01"
          min="0"
        />
        <Input
          placeholder="Valor de compra"
          onChange={(e) =>
            setDados({ ...dados, valorDeCompra: Number(e.target.value) })
          }
          value={dados.valorDeCompra}
          type="number"
          step="0.01"
          min="0"
        />
        <SelectStatus dados={dados} setDados={setDados} />
        <button type="button" onClick={() => adicionarProduto(dados)}>
          Adicionar
        </button>
      </div>
    </div>
  );
}
