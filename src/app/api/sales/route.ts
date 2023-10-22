import { db } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { type products } from "@prisma/client";
type productsInSaleListToAdd = {
  amount: number;
  total: number;
  productId: number;
  product: products;
};

type POSTBody = {
  productsInSale: productsInSaleListToAdd[];
  delivery: boolean;
  observations: string;
  tableId: number;
};

export async function POST(req: Request) {
  try {
    const body: POSTBody = await req.json();
    const { tableId, observations, productsInSale, delivery } = body;

    const existingSaleInTable = await db.sales.findFirst({
      where: {
        tableId: tableId,
      },
    });

    if (existingSaleInTable) {
      const productsInSaleWithSaleId = productsInSale.map((productInSale) => {
        return {
          amount: productInSale.amount,
          saleId: existingSaleInTable.id,
          total: productInSale.total,
          productId: productInSale.productId,
        };
      });

      for (let productInSale of productsInSaleWithSaleId) {
        const existingProductInSale = await db.productsInSale.findFirst({
          where: {
            AND: [
              { productId: productInSale.productId },
              { saleId: existingSaleInTable.id },
            ],
          },
        });

        if (existingProductInSale) {
          const updatedProductInSale = await db.productsInSale.update({
            where: { id: existingProductInSale.id },
            data: {
              amount: existingProductInSale.amount + productInSale.amount,
              total: existingProductInSale.total + productInSale.total,
            },
          });
        } else {
          const productsInSaleCreated = await db.productsInSale.create({
            data: productInSale,
          });
        }
      }

      if (existingSaleInTable.observations !== observations) {
        const updatedExistingSaleIntable = await db.sales.update({
          where: {
            id: existingSaleInTable.id,
          },
          data: {
            observations: observations,
          },
        });
      }

      const productsInSaleList = await db.productsInSale.findMany({
        where: { saleId: existingSaleInTable.id },
        include: { product: true },
      });

      return NextResponse.json(
        { productsInSaleList, message: "productInSale created succesfully" },
        { status: 201 }
      );
    }

    const sale = await db.sales.create({
      data: {
        tableId: tableId,
        observations: observations,
        delivery: delivery,
      },
    });

    const productsInSaleWithSaleId = productsInSale.map((productInSale) => {
      return {
        amount: productInSale.amount,
        saleId: sale.id,
        total: productInSale.total,
        productId: productInSale.productId,
      };
    });

    const productsInSaleList = productsInSale.map((productInSale) => {
      return {
        ...productInSale,
        saleId: sale.id,
      };
    });

    const productsInSaleCreated = await db.productsInSale.createMany({
      data: productsInSaleWithSaleId,
    });

    return NextResponse.json(
      { sale, productsInSaleList, message: "Sale created succesfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
