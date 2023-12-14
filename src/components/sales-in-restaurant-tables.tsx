"use client";
import { type ExtendedSales } from "@/types/prisma";
import { saleInRestaurantStatus } from "@prisma/client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TableRow } from "./table-row";
import { SaleDetails } from "./sale-details";

export const SalesInRestaurantTables = ({
  sales,
}: {
  sales: ExtendedSales[] | undefined;
}) => {
  const statusTitlesSeating: { [key in saleInRestaurantStatus]: string } = {
    [saleInRestaurantStatus.pending]: "Pedidos pendientes",
    [saleInRestaurantStatus.paid]: "Pedidos pagos",
  };

  const salesByRestaurantStatus: {
    [key in saleInRestaurantStatus]: ExtendedSales[];
  } = {
    [saleInRestaurantStatus.pending]: [],
    [saleInRestaurantStatus.paid]: [],
  };
  sales?.forEach((sale) => {
    if (sale.salesInRestaurant) {
      salesByRestaurantStatus[sale.salesInRestaurant.status].push(sale);
    }
  });

  const [showSaleDetails, setShowSaleDetails] = useState<ExtendedSales | null>(
    null
  );

  const updateShowSaleDetail = (sale: ExtendedSales | null) => {
    setShowSaleDetails(sale);
  };

  return (
    <>
      {Object.keys(salesByRestaurantStatus).map((status) => {
        if (status === "paid")
          return (
            <div key={status} className="w-full">
              <h2 className={status}>
                {statusTitlesSeating[status as saleInRestaurantStatus]}
              </h2>
              <table className={`${status} seatingsTable w-full`} key={status}>
                <thead className={status}>
                  <tr>
                    <th>Fecha</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody className="overflow-hidden relative">
                  <AnimatePresence>
                    {salesByRestaurantStatus[
                      status as saleInRestaurantStatus
                    ].map((sale) => {
                      return (
                        <TableRow
                          key={sale.id}
                          sale={sale}
                          updateShowSaleDetail={updateShowSaleDetail}
                        />
                      );
                    })}
                  </AnimatePresence>
                  {!salesByRestaurantStatus[status as saleInRestaurantStatus]
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

        return (
          <div key={status} className="w-full min-h-[20rem]">
            <h2 className={status}>
              {statusTitlesSeating[status as saleInRestaurantStatus]}
            </h2>
            <table className={`${status} seatingsTable w-full`} key={status}>
              <thead className={status}>
                <tr>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Mesa</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody className="overflow-hidden relative">
                <AnimatePresence>
                  {salesByRestaurantStatus[
                    status as saleInRestaurantStatus
                  ].map((sale) => {
                    return (
                      <TableRow
                        key={sale.id}
                        sale={sale}
                        updateShowSaleDetail={updateShowSaleDetail}
                      />
                    );
                  })}
                  {!salesByRestaurantStatus[status as saleInRestaurantStatus]
                    .length && (
                    <tr className="h-14 border">
                      <td colSpan={5} className="text-center ">
                        {status === "sent" && "No hay pedidos en mesa"}
                        {status === "pending" &&
                          "No hay pedidos en preparación"}
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
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
