"use client";
import { AnimatePresence, motion } from "framer-motion";
import { IconX, IconPlus, IconMinus, IconTrash } from "@tabler/icons-react";
import { CategorySelect } from "./category-select";
import { useContext, useEffect, useState } from "react";
import { seatingsContext } from "@/context/seatings-context";
import { calculateTotal, formatPrice } from "@/libs/formats";
import { useSeatingMenu } from "@/hooks/use-seating-menu";
import { type ExtendedTables } from "@/types/prisma";
import { ProductInput } from "./product-input";

export const SeatingMenu = ({
  selectedTable,
}: {
  selectedTable: ExtendedTables;
}) => {
  const {
    addProductToSale,
    updateObservationInSale,
    productsInSaleListToAdd,
    totalSaleToAdd,
    productsInSaleList,
    updateObservationsValue,
    observations,
    removeProductsInSaleToAdd,
    createSeatingSale,
    removeProductInSaleList,
    removeProductFromSaleListToAdd,
  } = useSeatingMenu(selectedTable.currentSale);
  const [totalSale, setTotalSale] = useState("");
  1;
  useEffect(() => {
    setTotalSale(calculateTotal(productsInSaleList));
  }, [productsInSaleList]);

  const { changeSelectedTable } = useContext(seatingsContext);

  if (!changeSelectedTable) {
    return <div>Error</div>;
  }
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: ({ delay }: { delay: number }) => ({
      opacity: 1,
      transition: { delay, duration: 0.5 },
    }),
  };
  return (
    <div className="w-full h-full absolute z-[100] top-0 left-0 flex justify-center items-center bg-black/10">
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        exit={{ scale: 0 }}
        key={selectedTable?.numberTable}
        transition={{ duration: 0.3, type: "spring" }}
        className="w-4/5 h-4/5 bg-white flex flex-col z-[200] shadow relative rounded-lg overflow-y-auto overflow-x-hidden"
      >
        <header className="bg-amber-500 p-2 text-white font-medium text-lg flex sticky top-0 justify-between z-50">
          <h2>mesa {`#${selectedTable?.numberTable}`}</h2>
          <button onClick={() => changeSelectedTable(null)} className="mr-2">
            <IconX />
          </button>
        </header>
        <article className="flex flex-col ">
          <h3 className="bg-[#aaa] text-white text-lg font-bold p-2">
            Agregar productos
          </h3>
          <div className="flex flex-col p-5 gap-2">
            <ProductInput addProductToSale={addProductToSale} />
            <CategorySelect addProductToSale={addProductToSale} />
          </div>
          <section className="p-5">
            {productsInSaleListToAdd?.map((productInSale, index) => (
              <div key={productInSale.productId}>
                <motion.article
                  layout
                  initial="hidden"
                  variants={variants}
                  animate="visible"
                  custom={{ delay: (index + 1) * 0.2 }}
                  exit="hidden"
                  className="w-full flex h-14 items-center bg-[#fff0c4] border-l-5 border-amber-400 mb-1 px-4"
                >
                  <div className="flex overflow-hidden gap-2  w-36 h-10 text-[#777] mr-5">
                    <button
                      onClick={() =>
                        removeProductFromSaleListToAdd(productInSale.product.id)
                      }
                      className=" border  rounded-md  border-[#888] active:scale-90 w-1/3 text-center grid place-content-center  transition-all"
                    >
                      <IconMinus />
                    </button>
                    <span className=" border rounded-md text-[#444] border-[#888] font-semibold w-1/3 grid place-content-center">
                      {productInSale.amount}
                    </span>
                    <button
                      onClick={() => addProductToSale(productInSale.product)}
                      className=" border rounded-md border-[#888] active:scale-90 w-1/3 grid place-content-center  transition-all"
                    >
                      <IconPlus />
                    </button>
                  </div>
                  <p className="font-medium text-grayBackground">
                    {productInSale.product.name}
                  </p>
                  <div className="ml-auto flex gap-5 items-center">
                    <span className="">
                      {formatPrice.format(productInSale.total)}
                    </span>
                    <button
                      onClick={() =>
                        removeProductsInSaleToAdd(productInSale.productId)
                      }
                      className="text-[#666] active:scale-90 transition-all p-1 rouned-md"
                    >
                      <IconX />
                    </button>
                  </div>
                </motion.article>
                {index === productsInSaleListToAdd.length - 1 && (
                  <motion.article
                    initial="hidden"
                    variants={variants}
                    animate="visible"
                    custom={{ delay: (index + 1) * 0.5 }}
                    exit="hidden"
                    className="w-full flex h-14 items-center bg-[#eee] border-l-5 border-[#ccc] mb-1 px-4"
                  >
                    <span className="font-medium mr-2">Total a confirmar:</span>
                    <span>{formatPrice.format(Number(totalSaleToAdd))}</span>
                    <button
                      onClick={() => {
                        createSeatingSale(selectedTable.id);
                        changeSelectedTable(null);
                      }}
                      className="ml-auto bg-[#555] text-white rounded-md px-2 py-1"
                    >
                      Confirmar
                    </button>
                  </motion.article>
                )}
              </div>
            ))}
          </section>
        </article>
        <motion.div layout className="flex flex-col ">
          <h3 className="bg-[#aaa] text-white text-lg font-bold p-2">
            Observaciones
          </h3>
          <div className="w-full p-5 flex flex-col items-center ">
            <textarea
              placeholder="Añade una nota al pedido..."
              value={observations ? observations : ""}
              onChange={updateObservationsValue}
              className="w-3/4 rounded resize-none bg-[#ddd] px-3 py-2 font-semibold placeholder:text-[#888] focus:outline-none  focus:border-none"
              cols={20}
              rows={5}
            ></textarea>
            {selectedTable.currentSale && (
              <button
                onClick={() =>
                  updateObservationInSale(
                    selectedTable.currentSale.saleId,
                    observations
                  )
                }
                className="mt-5 bg-[#555] text-white font-medium rounded-md px-2 py-1"
              >
                Actualizar Observacion
              </button>
            )}
          </div>
        </motion.div>
        <motion.div layout className="flex flex-col">
          <h3 className="bg-[#aaa] text-white text-lg font-bold p-2 w-full">
            Pedido
          </h3>
          {productsInSaleList.length ? (
            <div className="w-full p-5">
              <table className="w-full text-[#555] font-medium rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-green-400 font-semibold text-white">
                    <th>Cant</th>
                    <th>Producto</th>
                    <th>Total</th>
                    <th className="w-1/12"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {productsInSaleList?.map((productInSale, index) => (
                      <motion.tr
                        id={`${productInSale.id}`}
                        key={index}
                        initial="hidden"
                        variants={variants}
                        animate="visible"
                        custom={{ delay: (index + 1) * 0.2 }}
                        exit="hidden"
                        className="h-12 border "
                      >
                        <td>{productInSale.amount}</td>
                        <td>{productInSale.product?.name}</td>
                   
                        <td> {formatPrice.format(productInSale.total)}</td>
                        <td className="flex h-12 w-full justify-center items-center">
                          <button
                            onClick={() =>
                              removeProductInSaleList(productInSale.id)
                            }
                          >
                            <IconTrash />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center font-medium py-8">
              En esta mesa no hay ningun pedido...
            </p>
          )}
        </motion.div>
        <div className="flex flex-col sticky -bottom-1 w-full mt-auto">
          <h3 className="bg-[#aaa] text-white text-lg font-bold p-2 flex">
            <span>Total Mesa #{selectedTable?.numberTable}:</span>
            <span className="mr-2 ml-auto">{totalSale}</span>
          </h3>
        </div>
      </motion.div>
    </div>
  );
};
