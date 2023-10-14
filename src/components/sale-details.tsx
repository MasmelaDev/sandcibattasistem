import { ExtendedSales, ExtendedTables } from "@/types/prisma";
import { motion } from "framer-motion";
import { useState } from "react";
import { calculateTotal, formatPrice } from "@/libs/formats";
import { IconX, IconTrash, IconEdit } from "@tabler/icons-react";
import { TimerCounter } from "./time-counter";
import { useContext } from "react";
import { seatingsContext } from "@/context/seatings-context";
import { useRouter } from "next/navigation";
type Props = {
  sale: ExtendedSales;
  updateShowSaleDetail: (sale: ExtendedSales | null) => void;
};
export const SaleDetails = ({ sale, updateShowSaleDetail }: Props) => {
  const [saleDate, setSaleDate] = useState<Date>(new Date(sale.createdAt));
  const router = useRouter();
  const { changeSelectedTable, tablesList } = useContext(seatingsContext);
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: ({ delay }: { delay: number }) => ({
      opacity: 1,
      transition: { delay, duration: 0.5 },
    }),
  };
  if (!changeSelectedTable) {
    return <div>error</div>;
  }

  const openSeatingMenu = (tableId: number) => {
    const table = tablesList?.find((table) => table.id == tableId);
    if (table) {
      updateShowSaleDetail(null)
      changeSelectedTable(table);
    } else {
      return;
    }
  };
  const deleteSale = async (saleId: number) => {
    const res = await fetch(`http://localhost:3000/api/sales/${saleId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    updateShowSaleDetail(null);
    router.refresh();
  };
  return (
    <motion.aside
      key={sale.id}
      animate={{ x: 0 }}
      initial={{ x: 800 }}
      transition={{ duration: 0.3 }}
      exit={{ x: 800 }}
      className="absolute w-[38rem] bg-white top-20 h-[70vh] right-0 z-50 shadow-lg flex flex-col shadow-black/30 overflow-x-hidden overflow-y-auto rounded-tl-lg rounded-bl-lg"
    >
      <header className="bg-amber-500 text-white  flex p-2 sticky top-0 w-full  items-center h-14">
        <h2 className="flex items-center font-semibold">
          Venta - Mesa #{sale.table.numberTable}
        </h2>
        <div className="ml-auto flex gap-3" role="group">
          <button className="p-1 bg-amber-600 rounded-lg" onClick={() => openSeatingMenu(sale.table.id)}>
            <IconEdit />
          </button>
          <button className="p-1 bg-amber-600 rounded-lg" onClick={() => deleteSale(sale.id)}>
            <IconTrash />
          </button>
          <button
            className="p-1"
            onClick={() => updateShowSaleDetail(null)}
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
            {saleDate?.toLocaleDateString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </p>
          <p>
            <span className="font-medium">Tiempo: </span>{" "}
            <TimerCounter date={saleDate} />
          </p>
          <p>
            <span className="font-medium">Observaciones: </span>{" "}
            {sale.observations}
          </p>
        </article>
        <article className="px-5 pt-6">
          <table className="w-full text-[#555] font-medium rounded-md overflow-hidden">
            <thead>
              <tr className="bg-green-400 font-semibold text-white">
                <th>Cant</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="">
              {sale.productsInSale?.map((productInSale, index) => (
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
                  <td>{formatPrice.format(productInSale.product.price)}</td>
                  <td>{formatPrice.format(productInSale.total)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
      <div className="mt-5 "></div>
      <article className="bg-[#888] text-white sticky bottom-0 w-full flex p-2 justify-between text-xl mt-auto ">
        <p className="font-medium">Total:</p>
        <p>{calculateTotal(sale.productsInSale)}</p>
      </article>
    </motion.aside>
  );
};
