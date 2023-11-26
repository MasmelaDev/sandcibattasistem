import { db } from "@/libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

type Props = {
  params: { id: string };
};

export async function GET(req: Request, { params }: Props) {
  try {
    const categorie = await db.categories.findUnique({
      where: { id: +params.id },
      include: { products: true },
    });
    return NextResponse.json(categorie, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
export async function DELETE(req: Request, { params }: Props) {
  try {
    const deletedProducts = await db.products.deleteMany({
      where: { categoryId: +params.id },
    });
    const deletedCategorie = await db.categories.delete({
      where: { id: +params.id },
    });
    return NextResponse.json({deletedCategorie,message:"Category deleted Successfully"}, { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if(error.code === 'P2003'){
        return NextResponse.json({ error: 'En tu categoria tienes productos que estan en una venta' }, { status: 200 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
