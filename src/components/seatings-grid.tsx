"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { seatingsContext } from "@/context/seatings-context";
export const SeatingsGrid = () => {
  const grid = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const { tables, selectedTable, changeSelectedTable } = useContext(seatingsContext);

  if (!changeSelectedTable) {
    return <div>Error</div>;
  }
  return (
    <div className="tablesGrid grid w-2/5 h-full">
      {grid.current.map((position) => (
        <article
          className="border flex justify-center items-center border-[#444]"
          key={position}
          id={`${position}`}
        >
          {tables?.map((table) => {
            if (position === table.position) {
              const tableStyleStatus = table.currentSale
                ? "bg-green-500 table-shadow--active"
                : "bg-[#999] table-shadow";

              const selectedTableStyle =
                selectedTable?.id === table.id
                  ? "border-5  border-amber-500"
                  : "";
              return (
                <motion.div
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  initial={{ scale: 0 }}
                  title={`mesa #${table.numberTable}`}
                  key={table.id}
                  id={`${table.position}`}
                  onClick={() => changeSelectedTable(table)}
                  className={` ${tableStyleStatus} ${selectedTableStyle} cursor-pointer font-bold transition-all duration-250 w-[150px] h-[150px] text-xl  flex justify-center items-center  rounded-full  `}
                >
                  {table.numberTable}
                </motion.div>
              );
            }
          })}
        </article>
      ))}
    </div>
  );
};
