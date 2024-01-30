"use client";
import { Input } from "@/components/input";
import { DeliveryProductsTable } from "@/components/delivery-products-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  type domiciliary,
  type neighborhood,
  type products,
} from "@prisma/client";
import { NeighborhoodInput } from "./neighborhood-input";
import { PhoneInput } from "./phone-input";
import { type ExtendedCustomers } from "@/types/prisma";

import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

type productsInSaleListToAdd = {
  amount: number;
  total: number;
  productId: number;
  product: products;
};
export const DeliveryForm = ({
  domiciliaries,
  neighborhoods,
  customers,
}: {
  domiciliaries: domiciliary[];
  neighborhoods: neighborhood[];
  customers: ExtendedCustomers[];
}) => {
  const router = useRouter();
  const [productsInSaleList, setProductsInSaleList] = useState<
    productsInSaleListToAdd[]
  >([]);

  const updateProductInSaleList = (
    productInSaleList: productsInSaleListToAdd[]
  ) => {
    setProductsInSaleList(productInSaleList);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const neighborhoodFormData = formData.get("neighborhood") as string;
    const neighborhood = neighborhoods.find(
      (neighborhood) => neighborhood.name === neighborhoodFormData.toLowerCase()
    );
    if (!neighborhood) return;
    formData.set("neighborhood", neighborhood?.id.toString());

    const data = Object.fromEntries(formData);
    console.log(data);

    e.currentTarget.reset();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sales/saleInDelivery`,
      {
        method: "POST",
        body: JSON.stringify({ ...data, productsInSaleList }),
      }
    );
    const resData = await res.json();
    console.log(resData);
    setProductsInSaleList([]);
    router.refresh();
  };

  return (
    <>
      <div className="pt-4 px-5 flex justify-end gap-2">
        <Link
          href={"?agregar-domiciliario=true"}
          className="flex bg-[#555] text-white rounded-lg px-2 py-1 gap-2"
        >
          <IconPlus /> Domiciliario
        </Link>

        <Link
          href={"?agregar-barrio=true"}
          className="flex bg-[#555] text-white rounded-lg px-2 py-1 gap-2"
        >
          <IconPlus /> Barrio
        </Link>
      </div>

      <form id="deliveryForm" className="pt-4 px-5" onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-3">
          <PhoneInput customers={customers} />
          <label htmlFor="name" className="flex flex-col w-[360px]">
            Nombre
            <Input
              autoComplete="off"
              autoCorrect="off"
              placeholder="Miguel Lopez"
              type="text"
              id="name"
              name="name"
              required
            />
          </label>
        </div>
        <div className="flex gap-2 mb-3">
          <label htmlFor="street" className="flex flex-col w-[196px]">
            Calle
            <Input
              autoComplete="off"
              autoCorrect="off"
              placeholder="Calle 00"
              type="text"
              id="street"
              name="street"
              required
            />
          </label>
          <label htmlFor="number" className="flex flex-col w-[196px]">
            Numero
            <Input
              autoComplete="off"
              autoCorrect="off"
              placeholder="#00-00"
              type="text"
              id="number"
              name="number"
              required
            />
          </label>
          <NeighborhoodInput neighborhoods={neighborhoods} />
          <label htmlFor="deliveryPrice" className="flex flex-col w-[116px] ">
            Domicilio
            <Input
              autoComplete="off"
              autoCorrect="off"
              min={0}
              type="number"
              id="deliveryPrice"
              name="deliveryPrice"
              defaultValue={0}
              required
            />
          </label>
        </div>
        <div className="flex gap-2  mb-3 ">
          <label htmlFor="domiciliary" className="flex flex-col w-[196px]">
            Domiciliario
            <select
              className="bg-[#fff] text-black  rounded-md px-2 py-1 border focus:outline-none"
              name="domiciliary"
              id="domiciliary"
            >
              <option value="3">NS</option>
              {domiciliaries.map(
                (domiciliary) =>
                  domiciliary.id !== 3 && (
                    <option key={domiciliary.id} value={domiciliary.id}>
                      {domiciliary.name}
                    </option>
                  )
              )}
            </select>
          </label>
          <label htmlFor="observations" className="flex flex-col w-[300px]">
            Observaciones
            <Input
              autoComplete="off"
              autoCorrect="off"
              type="text"
              id="observations"
              name="observations"
            />
          </label>
        </div>

        <DeliveryProductsTable
          productsInSaleList={productsInSaleList}
          updateProductInSaleList={updateProductInSaleList}
        />
        {productsInSaleList.length > 0 && (
          <button
            className="border bg-[#777] mx-auto block text-white font-medium px-2 py-1 rounded "
            type="submit"
          >
            Crear venta
          </button>
        )}
      </form>
    </>
  );
};
