import { SalesInDeliveryTables } from "@/components/sales-in-delivery-tables";
import { type ExtendedSales, type ExtendedCustomers } from "@/types/prisma";
import {
  type categories,
  type domiciliary,
  type neighborhood,
} from "@prisma/client";
import { DeliveryForm } from "@/components/delivery-form";
const getData = async () => {
  const salesTodayFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sales/today`,
    {
      cache: "no-cache",
    }
  );
  const salesToday: ExtendedSales[] = await salesTodayFetch.json();

  const categoriesFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      cache: "no-cache",
    }
  );
  const categories: categories[] = await categoriesFetch.json();

  const domiciliariesFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/domiciliaries`,
    {
      cache: "no-cache",
    }
  );
  const domiciliaries: domiciliary[] = await domiciliariesFetch.json();

  const neighborhoodsFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/neighborhoods`,
    {
      cache: "no-cache",
    }
  );
  const neighborhoods: neighborhood[] = await neighborhoodsFetch.json();

  const customersFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customers`,
    {
      cache: "no-cache",
    }
  );
  const customers: ExtendedCustomers[] = await customersFetch.json();
  return { salesToday, domiciliaries, neighborhoods, categories, customers };
};

const domiciliosPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { salesToday, domiciliaries, neighborhoods, customers } =
    await getData();
  return (
    <section className="flex ">
      <div className="w-[60%] flex flex-col h-full relative overflow-y-auto p-5 pt-16">
        <SalesInDeliveryTables sales={salesToday} />
      </div>
      <div className="w-[40%] flex flex-col bg-[#f6f6f6]  h-[calc(100vh-56px)]">
        <DeliveryForm
          customers={customers}
          neighborhoods={neighborhoods}
          domiciliaries={domiciliaries}
        />
      </div>
      {searchParams && (
        <div className="w-screen h-screen absolute top-0 flex justify-center items-center bg-black/40">
          <div className="absolute w-[300px] h-[200px] bg-white shadow-md "></div>
        </div>
      )}
    </section>
  );
};

export default domiciliosPage;
