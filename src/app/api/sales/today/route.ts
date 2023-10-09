import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { sales } from "@prisma/client";
export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sales = await db.sales.findMany({
      where: { createdAt: { gte: today } },
      include: {
        table: true,
        productsInSale:{include:{product:true}}
        
      },
    });
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}