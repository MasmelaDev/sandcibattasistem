import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";
type Props = {
  params: { id: string };
};

export async function DELETE(req: Request, { params }: Props) {
  try {
   

    const deletedProdusctInSale = await db.productsInSale.delete({
      where: { id: +params.id },
    });

    
    return NextResponse.json(
      { deletedProdusctInSale, message: "ProdusctInSale deleted succesfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
