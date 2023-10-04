"use client";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { CategorySelect } from "./category-select";
import { useContext } from "react";
import { seatingsContext } from "@/context/seatings-context";
export const SeatingMenu = () => {

  const { tables, selectedTable, changeSelectedTable } = useContext(seatingsContext);

  if (!changeSelectedTable) {
    return <div>Error</div>;
  }
  return (
    <div className="w-full h-full flex justify-center items-center bg-black/10">
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="w-4/5 h-4/5 bg-white  shadow rounded-lg overflow-hidden"
      >
        <div className="bg-amber-500 p-2 font-medium text-lg flex justify-between">
          <span>mesa {`#${selectedTable?.numberTable}`}</span>
          <button onClick={() => changeSelectedTable(null)} className="mr-2">
            <IconX />
          </button>
        </div>
        <form>
          <label className="flex flex-col ">
            <p className="bg-[#aaa] text-lg font-bold p-1">
              Productos
            </p>
            <div className="flex flex-col p-5 gap-2">
              <input placeholder="Buscar producto..." type="text"  className="bg-[#eee] focus:outline-none focus:ring-transparent text-grayBackground pl-3 py-3 rounded-sm placeholder:text-[#888]"  />
              <CategorySelect />
            </div>
          </label>
        </form>
      </motion.div>
    </div>
  );
};
