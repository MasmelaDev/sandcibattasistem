import { type ExtendedSales } from "@/types/prisma";
import { IconPlayerTrackNextFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { calculateTotal } from "@/libs/formats";
import { useRouter } from "next/navigation";
type Props = {
  sale: ExtendedSales;
  updateShowSaleDetail: (sale: ExtendedSales | null) => void;
};

type ClickEventHandler = (
  event: React.MouseEvent<HTMLButtonElement>,
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

  const updateSaleStatus: ClickEventHandler = async (event, saleId) => {
    event.stopPropagation();
    
    const res = await fetch(`http://localhost:3000/api/sales/salesInRestaurant/${saleId}`, {
      method: "PUT",
      body: JSON.stringify({ status: "paid",tableId:null }),
    });
    const data = await res.json()
    console.log(data)
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
        className={`cursor-pointer ${sale.salesInRestaurant.status}`}
        onClick={() => updateShowSaleDetail(sale)}
      >

        <td>{date.toLocaleDateString("en-US", options)}</td>
        <td>{calculateTotal(sale.productsInSale)}</td>
        {sale.salesInRestaurant.status !== "paid" && (
          <>
        <td>{sale.salesInRestaurant.table.numberTable}</td>
          <td className=" text-white">
            <button
              onClick={(event) => updateSaleStatus(event, sale.id)}
              className={` ${sale.salesInRestaurant.status} rounded-md p-1`}
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
