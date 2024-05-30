"use client";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { set } from "zod";

interface Produto {
  nome: string;
  quantidade: string;
  valorDeVenda?: string;
  valorDeCompra?: string;
  status?: string;
}

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [dados, setDados] = useState<Produto>({
    nome: "",
    quantidade: "",
    valorDeVenda: "",
    valorDeCompra: "",
    status: "",
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
      <div className="flex flex-col gap-1">
        {produtos.map((produto, index) => (
          <div key={index} className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 ">
              <p>{produto.nome} </p>
              <p>{produto.quantidade} </p>
              <p>{produto.valorDeVenda} </p>
              <p>{produto.valorDeCompra} </p>
              <p>{produto.status} </p>
            </div>
            <Button
              variant={"destructive"}
              onClick={() => removerProduto(index)}
              className="p-2"
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
          </div>
        ))}
      </div>

      <div className="flex">
        <Input
          placeholder="Nome do produto"
          onChange={(e) => setDados({ ...dados, nome: e.target.value })}
          value={dados.nome}
        />
        <Input
          placeholder="Quantidade"
          onChange={(e) => setDados({ ...dados, quantidade: e.target.value })}
          value={dados.quantidade}
        />
        <Input
          placeholder="Valor de venda"
          onChange={(e) => setDados({ ...dados, valorDeVenda: e.target.value })}
          value={dados.valorDeVenda}
        />
        <Input
          placeholder="Valor de compra"
          onChange={(e) =>
            setDados({ ...dados, valorDeCompra: e.target.value })
          }
          value={dados.valorDeCompra}
        />
        <Input
          placeholder="Status"
          onChange={(e) => setDados({ ...dados, status: e.target.value })}
          value={dados.status}
        />
        <button onClick={() => adicionarProduto(dados)}>Adicionar</button>
      </div>
    </div>
  );
}
