import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";
type Props = {
  params: { id: string };
};
export async function PUT(req: Request, { params }: Props) {
  try {
    const body = await req.json();

    const updatedSale = await db.salesInDelivery.update({
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

export async function DELETE(req: Request, { params }: Props) {
  try {
    const deletedProductsInSale = await db.productsInSale.deleteMany({
      where: { saleId: +params.id },
    });
    const deletedSaleInDelivery = await db.salesInDelivery.delete({
      where: { saleId: +params.id },
    });
    const deletedSale = await db.sales.delete({
      where: { id: +params.id },
    });
    console.log(deletedProductsInSale);
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
