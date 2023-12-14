"use client";
import { type ExtendedSales } from "@/types/prisma";
import { saleInDeliveryStatus } from "@prisma/client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TableRow } from "./table-row";
import { SaleDetails } from "./sale-details";

export const SalesInDeliveryTables = ({
  sales,
}: {
  sales: ExtendedSales[] | undefined;
}) => {
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

  const [showSaleDetails, setShowSaleDetails] = useState<ExtendedSales | null>(
    null
  );

  console.log(salesByDeliveryStatus);
  const updateShowSaleDetail = (sale: ExtendedSales | null) => {
    setShowSaleDetails(sale);
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
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Domiciliario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="overflow-hidden relative">
                <AnimatePresence>
                  {/* {salesByDeliveryStatus[status as saleInDeliveryStatus].map((sale) => {
                          return (
                            <TableRow
                              key={sale.id}
                              sale={sale}
                              updateShowSaleDetail={updateShowSaleDetail}
                            />
                          );
                      })} */}
                </AnimatePresence>
                {!salesByDeliveryStatus[status as saleInDeliveryStatus]
                  .length && (
                  <tr className="h-14 border">
                    <td colSpan={5} className="text-center ">
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
          <SaleDetails
            sale={showSaleDetails}
            updateShowSaleDetail={updateShowSaleDetail}
          />
        )}
      </AnimatePresence>
    </>
  );
};
