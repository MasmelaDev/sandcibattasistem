import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.categories.findMany({
      include: { products: true },
    });
    return NextResponse.json(categories, { status: 200 });
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
        { category: null, message: "Category with this name already exists" },
        { status: 409 }
      );
    }

    const category = await db.categories.create({
      data: body,
    });

    return NextResponse.json(
      { category, message: "Category created succesfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
