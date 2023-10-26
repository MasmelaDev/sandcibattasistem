import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";
type Props = {
  params: { id: string };
};
export async function PUT(req: Request, { params }: Props) {
  try {
    const body = await req.json();

    const updatedSale = await db.salesInRestaurant.update({
      where: { saleId: +params.id },
      data: body,
    });
    return NextResponse.json(
      { updatedSale, message: "Sale updated succesfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
