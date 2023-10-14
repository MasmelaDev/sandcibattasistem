"use client";
import { type ExtendedSales } from "@/types/prisma";
import { saleStatus } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TableRow } from "./table-row";
import { SaleDetails } from "./sale-details";

enum SaleStatus {
  Pending = "pending",
  Sent = "sent",
  Delivered = "delivered",
}

export const Tables = ({ sales }: { sales: ExtendedSales[] | undefined }) => {
  const pathname = usePathname();
  const statusTitlesSeating: { [key in SaleStatus]: string } = {
    [SaleStatus.Pending]: "En preparacion...",
    [SaleStatus.Sent]: "En mesa",
    [SaleStatus.Delivered]: "Pagos",
  };

  const salesByStatus: { [key in SaleStatus]: ExtendedSales[] } = {
    [SaleStatus.Pending]: [],
    [SaleStatus.Sent]: [],
    [SaleStatus.Delivered]: [],
  };
  sales?.forEach((sale) => {
    salesByStatus[sale.status].push(sale);
  });

  const [showSaleDetails, setShowSaleDetails] = useState<ExtendedSales | null>(
    null
  );

  const updateShowSaleDetail = (sale: ExtendedSales | null) => {
    setShowSaleDetails(sale);
  };

  if (pathname === "/mesas") {
    return (
      <>
        {Object.keys(salesByStatus).map((status) => (
          <div key={status} className="w-full">
            <h2 className={status}>
              {statusTitlesSeating[status as saleStatus]}
            </h2>
            <table className={`${status} seatingsTable w-full`} key={status}>
              <thead className={status}>
                <tr>
                  <th>Mesa</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody className="overflow-hidden relative">
                <AnimatePresence>
                  {salesByStatus[status as SaleStatus].map((sale) => {
                    if (!sale.delivery) {
                      return (
                        <TableRow
                          key={sale.id}
                          sale={sale}
                          status={status}
                          updateShowSaleDetail={updateShowSaleDetail}
                        />
                      );
                    }
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        ))}
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
  } else {
    return <div></div>;
  }
};
