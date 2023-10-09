"use cliente";
import { type sales } from "@prisma/client";
import { usePathname } from "next/navigation";

enum SaleStatus {
  Pending = "pending",
  Sent = "sent",
  Delivered = "delivered",
}

export const Tables = ({ sales }: { sales: sales[] | undefined }) => {
  const pathname = usePathname();
  const salesByStatus: { [key in SaleStatus]: sales[] } = {
    [SaleStatus.Pending]: [],
    [SaleStatus.Sent]: [],
    [SaleStatus.Delivered]: [],
  };
  console.log(sales)
  // sales?.forEach((sale) => {
  //   salesByStatus[sale.status].push(sale);
  // });

  if (pathname === "/mesas") {
    return (
      <>
        {Object.keys(salesByStatus).map((status) => (
          <table className="text-black" key={status}>
            <thead>
              <tr>
                <th>Mesa</th>
                <th>Productos</th>
                <th>Fecha</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {salesByStatus[status as SaleStatus].map((sale) => {
                if (!sale.delivery) {
                  return (
                    <tr key={sale.id}>
                      <td>{sale.table?.scalars.numberTable}</td>
                      
                      <td>{sale.createdAt.toDateString()}</td>
                      <td>{sale.total}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        ))}
      </>
    );
  }else{
    return(
      <div>s</div>
    )
  }
};
