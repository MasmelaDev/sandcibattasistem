import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const neighborhoods = await db.neighborhood.findMany();
    return NextResponse.json(neighborhoods, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
