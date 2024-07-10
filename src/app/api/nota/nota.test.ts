import { NextRequest, NextResponse } from "next/server";
import { POST } from "./route";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "@/lib/prisma";
import mime from "mime";
import { mockClient } from "aws-sdk-client-mock";
import { revalidatePath } from "next/cache";

jest.mock("@/lib/prisma");
jest.mock("next/cache");
jest.mock("mime");

const s3Mock = mockClient(S3Client);

describe("POST handler", () => {
  beforeEach(() => {
    s3Mock.reset();
    jest.clearAllMocks();
  });

  it("deve criar uma nota e enviar um arquivo para o S3 com sucesso", async () => {
    // Mock do S3
    s3Mock.on(PutObjectCommand).resolves({});

    // Mock do Prisma
    (prisma.cliente.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
    (prisma.nota.create as jest.Mock).mockResolvedValue({});

    // Mock do mime
    (mime.getExtension as jest.Mock).mockReturnValue("pdf");

    // Mock do revalidatePath
    (revalidatePath as jest.Mock).mockReturnValueOnce(undefined);
    (revalidatePath as jest.Mock).mockReturnValueOnce(undefined);

    const formData = new FormData();
    formData.append("numero", "123");
    formData.append("cliente", "1");
    formData.append(
      "produtos",
      JSON.stringify([
        {
          nome: "Produto A",
          quantidade: 2,
          valorDeVenda: 10,
          valorDeCompra: 5,
          status: "cotado",
        },
      ])
    );
    const file = new Blob(["conteúdo do arquivo"], { type: "application/pdf" });
    formData.append("arquivo", file);

    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: formData,
    });

    const response = await POST(request);

    expect(response.status).toBe(201);
    expect((await response.json()).message).toBe("Nota criada com sucesso");
  });

  it("deve retornar erro ao enviar um tipo de arquivo inválido", async () => {
    // Mock do S3
    s3Mock.on(PutObjectCommand).resolves({});

    // Mock do Prisma
    (prisma.cliente.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
    (prisma.nota.create as jest.Mock).mockResolvedValue({});

    // Mock do mime
    (mime.getExtension as jest.Mock).mockReturnValueOnce("txt");

    const formData = new FormData();
    formData.append("numero", "123");
    formData.append("cliente", "1");
    formData.append(
      "produtos",
      JSON.stringify([
        {
          nome: "Produto A",
          quantidade: 2,
          valorDeVenda: 10,
          valorDeCompra: 5,
          status: "disponível",
        },
      ])
    );
    const file = new Blob(["conteúdo do arquivo"], { type: "text/plain" });
    formData.append("arquivo", file);

    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: formData,
    });

    const response = await POST(request);

    expect(response.status).toBe(418);
    expect((await response.json()).errors).toBe("Tipo de arquivo inválido");
  });

  it("deve retornar erro ao criar uma nota sem arquivo e com formulário inválido", async () => {
    const formData = new FormData();
    formData.append("numero", "abc"); // Valor inválido
    formData.append("cliente", "1");
    formData.append(
      "produtos",
      JSON.stringify([
        {
          nome: "Produto A",
          quantidade: 2,
          valorDeVenda: 10,
          valorDeCompra: 5,
          status: "disponível",
        },
      ])
    );

    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: formData,
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect((await response.json()).errors).toBe("Formulário inválido");
  });
});
