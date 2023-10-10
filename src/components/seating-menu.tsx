"use client";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { CategorySelect } from "./category-select";
import { useContext } from "react";
import { seatingsContext } from "@/context/seatings-context";
export const SeatingMenu = () => {
  const { selectedTable, changeSelectedTable, productsInSaleList,totalSale } =
    useContext(seatingsContext);
  if (!changeSelectedTable) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-black/10">
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="w-4/5 h-4/5 bg-white z-30 shadow text-white rounded-lg overflow-hidden"
      >
        <div className="bg-amber-500 p-2 font-medium text-lg flex justify-between">
          <span>mesa {`#${selectedTable?.numberTable}`}</span>
          <button onClick={() => changeSelectedTable(null)} className="mr-2">
            <IconX />
          </button>
        </div>
        <div>
          <label className="flex flex-col ">
            <p className="bg-[#aaa] text-lg font-bold p-1">Productos</p>
            <div className="flex flex-col p-5 gap-2">
              <input
                placeholder="Buscar producto..."
                type="text"
                className="bg-[#eee] focus:outline-none focus:ring-transparent text-grayBackground pl-3 py-3 rounded-sm placeholder:text-[#888]"
              />
              <CategorySelect />
            </div>
            <div className="text-black">
              {productsInSaleList?.map((productInSale) => (
                <div key={productInSale.productId}>
                  <span>{productInSale.amount}</span>
                  <span>{productInSale.product.name}</span>
                  <span>{productInSale.total}</span>
                </div>
              ))}
            </div>
            <div>Total: {totalSale}</div>
          </label>
        </div>
      </motion.div>
    </div>
  );
};
