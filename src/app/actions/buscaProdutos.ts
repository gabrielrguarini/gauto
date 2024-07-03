"use server";
import prisma from "@/lib/prisma";
export async function BuscaProdutos() {
  try {
    const todosProdutos = await prisma.produto.findMany({
      include: {
        cliente: true,
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
      id: produto.id,
      nome: produto.nome,
      quantidade: produto.quantidade,
      valorDeCompra: produto.valorDeCompra,
      valorDeVenda: produto.valorDeVenda,
      cliente: produto.cliente?.nome || "Sem cliente",
      status: produto.status,
      clienteId: produto.clienteId,
    }));

    return produtosComCliente;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar produtos");
  } finally {
    await prisma.$disconnect();
  }
}
