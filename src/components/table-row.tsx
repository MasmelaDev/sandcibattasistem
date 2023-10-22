import { type ExtendedSales } from "@/types/prisma";
import { IconPlayerTrackNextFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { calculateTotal } from "@/libs/formats";
import { saleStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
type Props = {
  sale: ExtendedSales;
  updateShowSaleDetail: (sale: ExtendedSales | null) => void;
};

type ClickEventHandler = (
  event: React.MouseEvent<HTMLButtonElement>,
  status: saleStatus,
  saleId: number
) => void;

export const TableRow = ({ sale, updateShowSaleDetail }: Props) => {
  const router = useRouter();
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

  const updateSaleStatus: ClickEventHandler = async (event, status, saleId) => {
    event.stopPropagation();
    let nextStatus = "";
    const updateNextStatus = (status: saleStatus) => {
      if (status === "pending") {
        nextStatus = "sent";
      }
      if (status === "sent") {
        nextStatus = "delivered";
      }
    };

    updateNextStatus(status);
    const res = await fetch(`http://localhost:3000/api/sales/${saleId}`, {
      method: "PUT",
      body: JSON.stringify({ status: nextStatus }),
    });
    router.refresh();
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
        className={`cursor-pointer ${sale.status}`}
        onClick={() => updateShowSaleDetail(sale)}
      >

        <td>{date.toLocaleDateString("en-US", options)}</td>
        <td>{calculateTotal(sale.productsInSale)}</td>
        {sale.status !== "delivered" && (
          <>
        <td>{sale.table?.numberTable}</td>
          <td className=" text-white">
            <button
              onClick={(event) => updateSaleStatus(event, sale.status, sale.id)}
              className={` ${sale.status} rounded-md p-1`}
              >
              <IconPlayerTrackNextFilled />
            </button>
          </td>
              </>
        )}
      </motion.tr>
    </>
  );
};
