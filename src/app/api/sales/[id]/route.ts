import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";
type Props = {
  params: { id: string };
};

export async function DELETE(req: Request, { params }: Props) {
  try {
    const deletedProdusctsInSale = await db.productsInSale.deleteMany({
      where: { saleId: +params.id },
    });

    const deletedSale = await db.sales.delete({
      where: { id: +params.id },
    });
    return NextResponse.json(
      { deletedSale, message: "Sale deleted succesfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
export async function PUT(req: Request, { params }: Props) {
  try {
    const body = await req.json();
    const { status } = body;
    if (status === "delivered") {
      const updatedSale = await db.sales.update({
        where: { id: +params.id },
        data: { status: status, tableId: null },
      });
      return NextResponse.json(
        { updatedSale, message: "Sale updated succesfully" },
        { status: 200 }
      );
    }

    const updatedSale = await db.sales.update({
      where: { id: +params.id },
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
