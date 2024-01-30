"use client";
import { type ExtendedSales } from "@/types/prisma";
import { saleInDeliveryStatus } from "@prisma/client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { calculateTotal, formatPrice } from "@/libs/formats";
import {
  IconEdit,
  IconPlayerTrackNextFilled,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { TimerCounter } from "./time-counter";

type ClickEventHandler = (
  event: React.MouseEvent<HTMLButtonElement>,
  saleId: number
) => void;

export const SalesInDeliveryTables = ({
  sales,
}: {
  sales: ExtendedSales[] | undefined;
}) => {
  const router = useRouter();

  const statusTitlesSeating: { [key in saleInDeliveryStatus]: string } = {
    [saleInDeliveryStatus.pending]: "Pedidos pendientes",
    [saleInDeliveryStatus.sent]: "Pedidos Enviados",
    [saleInDeliveryStatus.delivered]: "Pedidos Entregados",
  };

  const salesByDeliveryStatus: {
    [key in saleInDeliveryStatus]: ExtendedSales[];
  } = {
    [saleInDeliveryStatus.pending]: [],
    [saleInDeliveryStatus.sent]: [],
    [saleInDeliveryStatus.delivered]: [],
  };
  sales?.forEach((sale) => {
    if (sale.salesInDelivery) {
      salesByDeliveryStatus[sale.salesInDelivery.status].push(sale);
    }
  });

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: ({ delay }: { delay: number }) => ({
      opacity: 1,
      transition: { delay, duration: 0.5 },
    }),
  };
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Habilita el formato de 12 horas (AM/PM)
  };

  const updateSaleStatus: ClickEventHandler = async (event, saleId) => {
    event.stopPropagation();
    const nextStatus = event.currentTarget.classList.contains("pending")
      ? "sent"
      : "delivered";
    if (nextStatus === "delivered") {
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sales/saleInDelivery/${saleId}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: nextStatus }),
      }
    );
    const data = await res.json();
    router.refresh();
  };

  const [showSaleDetails, setShowSaleDetails] = useState<ExtendedSales | null>(
    null
  );
  const deleteSaleInDelivery = async (saleId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sales/saleInDelivery/${saleId}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    setShowSaleDetails(null);
    router.refresh();
  };
  return (
    <>
      {Object.keys(salesByDeliveryStatus).map((status) => {
        return (
          <div key={status} className="w-full min-h-[15rem]">
            <h2 className={status}>
              {statusTitlesSeating[status as saleInDeliveryStatus]}
            </h2>
            <table className={`${status} seatingsTable w-full`} key={status}>
              <thead className={status}>
                <tr className="deliveryRow">
                  <th>Fecha</th>
                  <th>Telefono</th>
                  <th>Calle</th>
                  <th>Numero</th>
                  <th>Barrio</th>
                  <th>Domiciliario</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="overflow-hidden relative">
                <AnimatePresence>
                  {salesByDeliveryStatus[status as saleInDeliveryStatus].map(
                    (sale) => {
                      const date = new Date(sale.createdAt);
                      return (
                        <motion.tr
                          initial="hidden"
                          variants={variants}
                          animate="visible"
                          custom={{ delay: 0 }}
                          exit="hidden"
                          layoutId={`${sale.id}`}
                          key={sale.id}
                          onClick={() => {
                            setShowSaleDetails(sale);
                          }}
                          className={`cursor-pointer ${sale.salesInDelivery.status} deliveryRow`}
                        >
                          <td style={{ width: "17%" }}>
                            {date.toLocaleDateString("en-US", options)}
                          </td>
                          <td>{sale.salesInDelivery.customer.phone}</td>
                          <td>
                            {sale.salesInDelivery.customer.address.street}
                          </td>
                          <td>
                            {sale.salesInDelivery.customer.address.number}
                          </td>
                          <td>
                            {
                              sale.salesInDelivery.customer.address.neighborhood
                                .name
                            }
                          </td>
                          <td>{sale.salesInDelivery.domiciliary.name}</td>
                          <td>{calculateTotal(sale.productsInSale)}</td>
                          <td className="">
                            {sale.salesInDelivery.status !== "delivered" && (
                              <button
                                className={` ${sale.salesInDelivery.status} rounded-md p-1 mx-auto text-white`}
                                onClick={(e) => {
                                  updateSaleStatus(e, sale.id);
                                }}
                              >
                                <IconPlayerTrackNextFilled />
                              </button>
                            )}
                          </td>
                        </motion.tr>
                      );
                    }
                  )}
                </AnimatePresence>
                {!salesByDeliveryStatus[status as saleInDeliveryStatus]
                  .length && (
                  <tr className="h-14 border">
                    <td colSpan={10} className="text-center">
                      No hay pedidos pagos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      })}
      <AnimatePresence>
        {showSaleDetails && (
          <motion.aside
            key={showSaleDetails.id}
            animate={{ x: 0 }}
            initial={{ x: 800 }}
            transition={{ duration: 0.3 }}
            exit={{ x: 800 }}
            className="fixed w-[38rem] bg-white top-30 h-[70vh] right-0 z-50 shadow-lg flex flex-col shadow-black/30 overflow-x-hidden overflow-y-auto rounded-tl-lg rounded-bl-lg"
          >
            <header className="bg-amber-500 text-white  flex p-2 sticky top-0 w-full  items-center h-14">
              <h2 className="flex items-center font-semibold">Venta</h2>
              <div className="ml-auto flex gap-3" role="group">
                {showSaleDetails.salesInDelivery.status === "pending" && (
                  <>
                    <button className="p-1 bg-amber-600 rounded-lg">
                      <IconEdit />
                    </button>

                    <button
                      onClick={() => deleteSaleInDelivery(showSaleDetails.id)}
                      className="p-1 bg-amber-600 rounded-lg"
                    >
                      <IconTrash />
                    </button>
                  </>
                )}

                <button
                  className="p-1"
                  onClick={() => setShowSaleDetails(null)}
                >
                  <IconX />
                </button>
              </div>
            </header>
            <section className="">
              <h3 className=" font-medium  w-full text-center py-5 text-xl">
                Detalles del pedido
              </h3>
              <article className="flex flex-col gap-1 px-2 ">
                <p className="">
                  <span className="font-medium">Fecha: </span>

                  {new Date(showSaleDetails.createdAt).toLocaleDateString(
                    "es-ES",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    }
                  )}
                </p>
                <p>
                  <span className="font-medium">Tiempo: </span>{" "}
                  <TimerCounter date={new Date(showSaleDetails.createdAt)} />
                </p>
                <p>
                  <span className="font-medium">Cliente: </span>
                  {showSaleDetails.salesInDelivery.customer.name}
                </p>
                <p className="break-words">
                  <span className="font-medium">Observaciones: </span>{" "}
                  {showSaleDetails.observations}
                </p>
              </article>
              <article className="px-5 pt-6">
                <table className="w-full text-[#555] font-medium rounded-md overflow-hidden">
                  <thead>
                    <tr className="bg-green-400 font-semibold text-white">
                      <th>Cant</th>
                      <th>Producto</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {showSaleDetails.productsInSale?.map(
                      (productInSale, index) => (
                        <motion.tr
                          key={index}
                          initial="hidden"
                          variants={variants}
                          animate="visible"
                          custom={{ delay: (index + 1) * 0.2 }}
                          exit="hidden"
                          className="border h-14"
                        >
                          <td>{productInSale.amount}</td>
                          <td>{productInSale.product?.name}</td>
                          <td>{formatPrice.format(productInSale.total)}</td>
                        </motion.tr>
                      )
                    )}
                  </tbody>
                </table>
              </article>
            </section>
            <div className="mt-5 "></div>
            <article className="bg-[#888] text-white sticky bottom-0 w-full flex p-2 justify-between text-xl mt-auto ">
              <p className="font-medium">Total:</p>
              <p>{calculateTotal(showSaleDetails.productsInSale)}</p>
            </article>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
