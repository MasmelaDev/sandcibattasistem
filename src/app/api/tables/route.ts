import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tables = await db.tables.findMany();
    return NextResponse.json({ tables }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { numberTable, position } = body;

    const existingNumberTable = await db.tables.findUnique({
      where: {
        numberTable: numberTable,
      },
    });

    if (existingNumberTable) {
      return NextResponse.json(
        { table: null, message: "Table with this number already exists" },
        { status: 409 }
      );
    }

    const existingPositionTable = await db.tables.findFirst({
      where: {
        position: position,
      },
    });

    if (existingPositionTable) {
      return NextResponse.json(
        { table: null, message: "There is already a table in that position" },
        { status: 409 }
      );
    }

    const table = await db.tables.create({
      data: { numberTable: numberTable, position: position },
    });

    return NextResponse.json(
      { table: table, message: "Table created succesfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

