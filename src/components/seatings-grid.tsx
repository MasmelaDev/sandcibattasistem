"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { seatingsContext } from "@/context/seatings-context";
import { IconPlus } from "@tabler/icons-react";

export const SeatingsGrid = () => {
  const { modeEdit, tables, selectedTable, changeSelectedTable } =
    useContext(seatingsContext);
  const grid = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8]);


  if (!changeSelectedTable) {
    return <div>Error</div>;
  }
  if (!tables) {
    return <div>Error</div>;
  }

  return (
    <div className="tablesGrid grid w-2/5 h-full">
      {modeEdit ? (
        <>
          {grid.current.map((position) => {
            const tableAtPosition = tables?.find(
              (table) => table.position === position
            );

            return (
              <article
                className="border flex justify-center items-center border-[#444]"
                key={position}
                id={`gridTable${position}`}
              >
                {tableAtPosition ? (
                  <div
                    title={`mesa #${tableAtPosition.numberTable}`}
                    key={tableAtPosition.id}
                    id={`${tableAtPosition.position}`}
                    className={`bg-[#999] table-shadow cursor-pointer font-bold transition-all duration-250 w-[150px] h-[150px] text-xl  flex justify-center items-center  rounded-full  `}
                  >
                    {tableAtPosition.numberTable}
                  </div>
                ) : (
                  <motion.button
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    title="Agregar una mesa"
                    className="bg-[#666] rounded-md p-1"
                  >
                    <IconPlus />
                  </motion.button>
                )}
              </article>
            );
          })}
        </>
      ) : (
        <>
          {grid.current.map((position) => {
            const tableAtPosition = tables?.find(
              (table) => table.position === position
            );
            const tableStyleStatus = tableAtPosition?.currentSale
              ? "bg-green-500 table-shadow--active"
              : "bg-[#999] table-shadow";

            const selectedTableStyle =
              selectedTable?.id === tableAtPosition?.id
                ? "border-5  border-amber-500"
                : "";
            return (
              <article
                className="border flex justify-center items-center border-[#444]"
                key={position}
                id={`gridTable${position}`}
              >
                {tableAtPosition && (
                  <motion.div
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    initial={{ scale: 0 }}
                    title={`mesa #${tableAtPosition.numberTable}`}
                    key={tableAtPosition.id}
                    id={`${tableAtPosition.position}`}
                    onClick={() => changeSelectedTable(tableAtPosition)}
                    className={` ${tableStyleStatus} ${selectedTableStyle} cursor-pointer font-bold transition-all duration-250 w-[150px] h-[150px] text-xl  flex justify-center items-center  rounded-full  `}
                  >
                    {tableAtPosition.numberTable}
                  </motion.div>
                )}
              </article>
            );
          })}
        </>
      )}
    </div>
  );
};
