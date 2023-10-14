import { type ExtendedSales } from "@/types/prisma";
import { IconPlayerTrackNextFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { calculateTotal } from "@/libs/formats";
type Props = {
  sale: ExtendedSales;
  status: string;
  updateShowSaleDetail: (sale: ExtendedSales | null) => void;
};
export const TableRow = ({ sale, status, updateShowSaleDetail }: Props) => {
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

  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Habilita el formato de 12 horas (AM/PM)
  };

  return (
    <>
      <motion.tr
        initial="hidden"
        variants={variants}
        animate="visible"
        custom={{ delay: 0 }}
        exit="hidden"
        layoutId={`${sale.id}`}
        className={`cursor-pointer ${status}`}
        onClick={()=>updateShowSaleDetail(sale)}
      >
        <td>{sale.table?.numberTable}</td>

        <td>{date.toLocaleDateString("en-US", options)}</td>
        <td>{calculateTotal(sale.productsInSale)}</td>
        <td className=" text-white">
          <button className={` ${status} rounded-md p-1`}>
            <IconPlayerTrackNextFilled />
          </button>
        </td>
      </motion.tr>
    </>
  );
};
