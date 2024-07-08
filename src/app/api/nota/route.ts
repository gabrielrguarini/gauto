import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime";

const s3Client = new S3Client({ region: process.env.AWS_REGION });
import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Produto } from "@prisma/client";

const CriaNotaSchema = z.object({
  produtos: z.array(
    z.object({
      nome: z.string(),
      quantidade: z.coerce.number(),
      valorDeVenda: z.coerce.number(),
      valorDeCompra: z.coerce.number(),
      status: z.string(),
    })
  ),
  numero: z.coerce.number(),
  cliente: z.coerce.number(),
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const produtos = formData.get("produtos");
  const produtosParsed: Produto[] = await JSON.parse(produtos as string);
  console.log("Produtos: ", produtos);
  console.log("Produtos Parsed: ", produtosParsed);

  const file = formData.get("arquivo") as Blob | null;
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;
    const s3Key = `uploads/${filename}`;
    const arquivoURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`;
    try {
      const dataValidado = CriaNotaSchema.safeParse({
        numero: formData.get("numero"),
        cliente: formData.get("cliente"),
        produtos: produtosParsed,
      });
      if (!dataValidado.success) {
        console.log(dataValidado.error.flatten().fieldErrors);
        return NextResponse.json(
          {
            errors: "Formulário inválido",
          },
          {
            status: 400,
          }
        );
      }
      const cliente = await prisma.cliente.findUnique({
        where: { id: dataValidado.data.cliente },
      });
      if (
        mime.getExtension(file.type) !== "pdf" ||
        mime.getExtension(file.type) !== "png" ||
        mime.getExtension(file.type) !== "jpg" ||
        mime.getExtension(file.type) !== "jpeg"
      ) {
        return NextResponse.json(
          {
            errors: "Tipo de arquivo inválido",
          },
          {
            status: 418,
          }
        );
      }
      const data = await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: s3Key,
          Body: buffer,
          ContentType: file.type,
        })
      );
      if (!cliente) {
        console.log("Cliente não encontrado ao criar nota");
        return NextResponse.json(
          {
            errors: "Cliente não encontrado",
          },
          {
            status: 400,
          }
        );
      }
      const criaNota = await prisma.nota.create({
        data: {
          numero: dataValidado.data.numero,
          cliente: {
            connect: {
              id: dataValidado.data.cliente,
            },
          },
          produtos: {
            create: dataValidado.data.produtos.map((produto) => ({
              nome: produto.nome,
              quantidade: produto.quantidade,
              valorDeVenda: produto.valorDeVenda,
              valorDeCompra: produto.valorDeCompra,
              status: produto.status,
              cliente: {
                connect: {
                  id: dataValidado.data.cliente,
                },
              },
            })),
          },
          arquivoURL: arquivoURL,
        },
      });
      revalidatePath("/notas");
      revalidatePath("/produtos");
      return NextResponse.json(
        {
          message: "Nota criada com sucesso",
        },
        {
          status: 201,
        }
      );

      // return NextResponse.json({
      //   data,

      // });
    } catch (erro) {
      console.error("Erro ao enviar arquivo para o S3: \n", erro);
      return NextResponse.json(
        { error: "Algo deu errado ao enviar o arquivo." },
        { status: 500 }
      );
    }
  } else {
    try {
      const dataValidado = CriaNotaSchema.safeParse({
        numero: formData.get("numero"),
        cliente: formData.get("cliente"),
        produtosParsed,
      });
      if (!dataValidado.success) {
        console.log(dataValidado.error.flatten().fieldErrors);
        return NextResponse.json(
          {
            errors: "Formulário inválido",
          },
          {
            status: 400,
          }
        );
      }
      const cliente = await prisma.cliente.findUnique({
        where: { id: dataValidado.data.cliente },
      });

      if (!cliente) {
        console.log("Cliente não encontrado ao criar nota");
        return NextResponse.json(
          {
            errors: "Cliente não encontrado",
          },
          {
            status: 400,
          }
        );
      }
      const criaNota = await prisma.nota.create({
        data: {
          numero: dataValidado.data.numero,
          cliente: {
            connect: {
              id: dataValidado.data.cliente,
            },
          },
          produtos: {
            create: dataValidado.data.produtos.map((produto) => ({
              nome: produto.nome,
              quantidade: produto.quantidade,
              valorDeVenda: produto.valorDeVenda,
              valorDeCompra: produto.valorDeCompra,
              status: produto.status,
              cliente: {
                connect: {
                  id: dataValidado.data.cliente,
                },
              },
            })),
          },
        },
      });
      revalidatePath("/notas");
      revalidatePath("/produtos");
      return NextResponse.json({
        message: "Nota criada com sucesso",
      });
    } catch (error) {
      console.log("Erro ao criar nota: ", error);
      throw error;
    }
  }
}
