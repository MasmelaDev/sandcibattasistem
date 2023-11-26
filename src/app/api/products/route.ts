import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.products.findMany();

    return NextResponse.json(
      { products },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    const existingCategoryName = await db.categories.findFirst({
      where: {
        name: name,
      },
    });

    if (existingCategoryName) {
      return NextResponse.json(
        { category: null, message: "Product with this name already exists" },
        { status: 409 }
      );
    }

    const product = await db.products.create({
      data: body,
    });

    return NextResponse.json(
      { product, message: "Product created succesfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
