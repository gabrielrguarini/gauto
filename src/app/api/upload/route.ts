import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("arquivo") as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: "Arquivo é obrigatório." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;
  const s3Key = `uploads/${filename}`;

  try {
    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: s3Key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return NextResponse.json({
      fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
      data,
    });
  } catch (erro) {
    console.error("Erro ao enviar para o S3\n", erro);
    return NextResponse.json({ error: "Algo deu errado." }, { status: 500 });
  }
}
