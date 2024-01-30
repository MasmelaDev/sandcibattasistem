import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await db.customers.findMany({
      include: { address: { include: { neighborhood: true } } },
    });
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
