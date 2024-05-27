const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Cria um usuário
  const user = await prisma.user.create({
    data: {
      email: "usuario@example.com",
      senha: "senhaSegura123",
    },
  });

  // Cria 10 clientes
  const clientes = await Promise.all([
    prisma.cliente.create({
      data: {
        nome: "Maria Silva",
        endereco: "Avenida Paulista, 1000",
        cidade: "São Paulo",
        telefone: "11987654321",
      },
    }),
    prisma.cliente.create({
      data: {
        nome: "João Souza",
        endereco: "Rua XV de Novembro, 500",
        cidade: "Curitiba",
        telefone: "41987654321",
      },
    }),
    prisma.cliente.create({
      data: {
        nome: "Ana Pereira",
        endereco: "Avenida Atlântica, 300",
        cidade: "Rio de Janeiro",
        telefone: "21987654321",
      },
    }),
    prisma.cliente.create({
      data: {
        nome: "Carlos Alberto",
        endereco: "Rua das Flores, 150",
        cidade: "Belo Horizonte",
        telefone: "31987654321",
      },
    }),
    prisma.cliente.create({
      data: {
        nome: "Fernanda Lima",
        endereco: "Avenida Goiás, 700",
        cidade: "Goiânia",
        telefone: "62987654321",
      },
    }),
    prisma.cliente.create({
      data: {
        nome: "Rafael Costa",
        endereco: "Rua das Acácias, 250",
        cidade: "Porto Alegre",
        telefone: "51987654321",
      },
    }),
    prisma.cliente.create({
      data: {
        nome: "Gabriela Santos",
        endereco: "Avenida Beira Mar, 400",
        cidade: "Fortaleza",
        telefone: "85987654321",
      },
    }),
    prisma.cliente.create({
      data: {
        nome: "Ricardo Gomes",
        endereco: "Rua dos Pinheiros, 800",
        cidade: "Florianópolis",
        telefone: "48987654321",
      },
    }),
    prisma.cliente.create({
      data: {
        nome: "Juliana Rocha",
        endereco: "Avenida das Américas, 600",
        cidade: "Salvador",
        telefone: "71987654321",
      },
    }),
    prisma.cliente.create({
      data: {
        nome: "Thiago Almeida",
        endereco: "Rua São João, 200",
        cidade: "Recife",
        telefone: "81987654321",
      },
    }),
  ]);

  // Cria produtos variados
  const produtos = await Promise.all([
    prisma.produto.create({
      data: {
        nome: "Notebook Dell Inspiron",
        quantidade: 10,
        valorDeVenda: 3500.0,
        valorDeCompra: 3000.0,
      },
    }),
    prisma.produto.create({
      data: {
        nome: "iPhone 13",
        quantidade: 15,
        valorDeVenda: 7000.0,
        valorDeCompra: 6000.0,
      },
    }),
    prisma.produto.create({
      data: {
        nome: 'Smart TV Samsung 55"',
        quantidade: 20,
        valorDeVenda: 4000.0,
        valorDeCompra: 3500.0,
      },
    }),
    prisma.produto.create({
      data: {
        nome: "PlayStation 5",
        quantidade: 5,
        valorDeVenda: 4500.0,
        valorDeCompra: 4000.0,
      },
    }),
    prisma.produto.create({
      data: {
        nome: "Geladeira Brastemp",
        quantidade: 30,
        valorDeVenda: 2500.0,
        valorDeCompra: 2000.0,
      },
    }),
  ]);

  // Cria notas associando produtos e clientes
  const notas = await Promise.all([
    prisma.nota.create({
      data: {
        numero: 1,
        cliente: { connect: { id: clientes[0].id } },
        produtos: {
          connect: [{ id: produtos[0].id }, { id: produtos[1].id }],
        },
      },
    }),
    prisma.nota.create({
      data: {
        numero: 2,
        cliente: { connect: { id: clientes[1].id } },
        produtos: {
          connect: [{ id: produtos[2].id }, { id: produtos[3].id }],
        },
      },
    }),
    prisma.nota.create({
      data: {
        numero: 3,
        cliente: { connect: { id: clientes[2].id } },
        produtos: {
          connect: [{ id: produtos[4].id }, { id: produtos[0].id }],
        },
      },
    }),
    prisma.nota.create({
      data: {
        numero: 4,
        cliente: { connect: { id: clientes[3].id } },
        produtos: {
          connect: [{ id: produtos[1].id }, { id: produtos[2].id }],
        },
      },
    }),
    prisma.nota.create({
      data: {
        numero: 5,
        cliente: { connect: { id: clientes[4].id } },
        produtos: {
          connect: [{ id: produtos[3].id }, { id: produtos[4].id }],
        },
      },
    }),
  ]);

  console.log({ user, clientes, produtos, notas });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
