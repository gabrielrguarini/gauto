"use server";
import prisma from "@/lib/prisma";
export async function BuscaProdutos() {
  try {
    const todosProdutos = await prisma.produto.findMany({
      include: {
        nota: {
          include: {
            cliente: true,
          },
        },
      },
      orderBy: {
        nome: "asc",
      },
    });

    const produtosComCliente = todosProdutos.map((produto) => ({
      nome: produto.nome,
      quantidade: produto.quantidade,
      valorDeCompra: produto.valorDeCompra,
      valorDeVenda: produto.valorDeVenda,
      cliente: produto.nota?.cliente.nome || "Sem cliente",
      status: produto.status,
    }));

    return produtosComCliente;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar produtos");
  } finally {
    await prisma.$disconnect();
  }
}
