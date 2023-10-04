import { db } from "@/libs/prisma";
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
