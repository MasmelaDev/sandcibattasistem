import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";
interface Params {
  params: { id: string };
}

export async function GET(req:Request,{ params }: Params) {
  try {
    const tableById = await db.tables.findUnique({
      where: {
        id: +params.id,
      },
      include: { currentSale: true },
    });
    if (!tableById) {
      return NextResponse.json({ message: "Table not found" }, { status: 404 });
    }
    return NextResponse.json(tableById, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();

    const updatedTable = await db.tables.update({
      where: {
        id: +params.id,
      },
      data: body,
    });

    return NextResponse.json(updatedTable, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(req:Request,{ params }: Params) {
  try {
    const currentSale = await db.salesInRestaurant.findFirst({
      where: {
        tableId: +params.id,
      },
    });
    if(currentSale?.status === 'pending'){
      return NextResponse.json({ error: "You can't delete a table with a pending sale" }, { status: 400 });
    }
    const deletedTable = await db.tables.delete({
      where: {
        id: +params.id,
      },
    });

    return NextResponse.json(
      { deletedTable, message: "Table deleted succesfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
