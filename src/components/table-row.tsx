import { type ExtendedSales } from "@/types/prisma";
import { IconTrash, IconPlayerTrackNextFilled } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
  sale: ExtendedSales;
  status:string
};
export const TableRow = ({ sale,status }: Props) => {
  const [showProducts, setShowProducts] = useState(false);

  const date = new Date(sale.createdAt);
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: ({ delay }: { delay: number }) => ({
      opacity: 1,
      transition: { delay, duration: 0.5 },
    }),
  };

  const formatPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits:0
  });
  const options:Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true // Habilita el formato de 12 horas (AM/PM)
  }
  return (
    <>
      <motion.tr className={status} >
        <td>{sale.table?.numberTable}</td>
        <td className="">
          <button
            className="border px-2 bg-[#666] w-44 rounded-md font-medium text-white py-1 "
            onClick={() => setShowProducts(!showProducts)}
          >
            {showProducts ? "Cerrar" : "Ver productos"}
          </button>
        </td>

        <td>{date.toLocaleDateString('en-US',options)}</td>
        <td>{formatPrice.format(sale.total)}</td>
        <td className=" text-white">
          <button className="bg-red-500 rounded-md p-1 mr-2">
            <IconTrash />
          </button>
          <button className={` ${status} rounded-md p-1`}>
            <IconPlayerTrackNextFilled />
          </button>
        </td>
      </motion.tr>
      <AnimatePresence>
        {showProducts && (
          <>
            <motion.tr
              initial="hidden"
              variants={variants}
              animate="visible"
              exit="hidden"
              custom={{ delay: 0 }}
              className="bg-[#aaa] relative z-[-1] "
            >
              <th>Cant</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Total</th>
              <th>Opciones</th>
            </motion.tr>
            {sale.productsInSale.map((product, index) => (
              <motion.tr
                initial="hidden"
                variants={variants}
                animate="visible"
                custom={{ delay: (index + 1) * 0.3 }}
                exit="hidden"
                layoutId={`${product.id}`}
                key={product.id}
              >
                <td>{product.amount}</td>
                <td>{product.product.name}</td>
                <td>{formatPrice.format(product.product.price)}</td>
                <td>{formatPrice.format(product.total)}</td>
                <td>
                  <button className="bg-red-500 rounded-md p-1 text-white">
                    <IconTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </>
        )}
      </AnimatePresence>
    </>
  );
};
