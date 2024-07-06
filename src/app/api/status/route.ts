import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findUnique({
      where: {
        id: 1,
      },
    });
    if (users !== null) {
      return NextResponse.json({
        updated_at: new Date().toISOString(),
        connection_status: "offline",
      });
    }
    return NextResponse.json({
      updated_at: new Date().toISOString(),
      connection_status: "ok",
    });
  } catch (error) {
    return NextResponse.json(
      {
        updated_at: new Date().toISOString(),
        connection_status: `Error: ${error}`,
      },
      { status: 500 }
    );
  }
}
