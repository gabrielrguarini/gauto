import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
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
        error_message: "Failed to fetch database status",
        error: error,
      },
      { status: 500 }
    );
  }
}
