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
  productsInSaleList: productsInSaleListToAdd[];
  observations: string;
  phone: string;
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  domiciliary: string;
  deliveryPrice: string;
};

export async function POST(req: Request) {
  try {
    const {
      name,
      phone,
      street,
      number,
      neighborhood,
      productsInSaleList,
      observations,
      deliveryPrice,
      domiciliary,
    }: POSTBody = await req.json();

    const sale = await db.sales.create({
      data: {
        observations: observations,
      },
    });

    const productsInSaleWithSaleId = productsInSaleList.map((productInSale) => {
      return {
        amount: productInSale.amount,
        saleId: sale.id,
        total: productInSale.total,
        productId: productInSale.productId,
      };
    });

    const productsInSale = await db.productsInSale.createMany({
      data: productsInSaleWithSaleId,
    });

    const customerExists = await db.customers.findFirst({
      where: {
        phone: phone,
      },
    });

    if (customerExists) {
      const updatedAddress = await db.address.update({
        where: {
          id: customerExists.addressId,
        },
        data: {
          street: street,
          number: number,
          neighborhoodId: +neighborhood,
        },
      });
      const updatedCustomer = await db.customers.update({
        where: {
          id: customerExists.id,
        },
        data: {
          name: name,
          addressId: updatedAddress.id,
        },
      })
      const saleInDelivery = await db.salesInDelivery.create({
        data: {
          saleId: sale.id,
          deliveryPrice: +deliveryPrice,
          customerId: updatedCustomer.id,
          domiciliaryId: +domiciliary,
        },
      });
      return NextResponse.json(
        {
          saleInDelivery: saleInDelivery,

          message: "Sale created succesfully",
        },
        { status: 201 }
      );
    } else {
      const address = await db.address.create({
        data: {
          street: street,
          number: number,
          neighborhoodId: +neighborhood,
        },
      });

      const customer = await db.customers.create({
        data: {
          name: name,
          phone: phone,
          addressId: address.id,
        },
      });

      const saleInDelivery = await db.salesInDelivery.create({
        data: {
          saleId: sale.id,
          deliveryPrice: +deliveryPrice,
          customerId: customer.id,
          domiciliaryId: +domiciliary,
        },
      });
      return NextResponse.json(
        {
          saleInDelivery: saleInDelivery,
          message: "Sale created succesfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
