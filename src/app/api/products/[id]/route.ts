import { db } from "@/libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

type Props = {
  params: { id: string };
};

export async function DELETE(req: Request, { params }: Props) {
  try {
    const deletedProduct = await db.products.delete({
      where: { id: +params.id },
    });
    console.log(deletedProduct);
    return NextResponse.json(
      { deletedProduct, message: "product deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if(error.code === 'P2003'){
        return NextResponse.json({ error: 'No puedes eliminar un producto que ya esta en una venta' }, { status: 200 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
