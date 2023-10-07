"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { seatingsContext } from "@/context/seatings-context";
import {
  IconPlus,
  IconX,
  IconPencil,
  IconTrash,
  IconArrowsMove,
} from "@tabler/icons-react";

export const SeatingsGrid = () => {
  const {
    modeEdit,
    editPosition,
    addTable,
    deleteTable,
    tablesList,
    selectedTable,
    changeSelectedTable,
  } = useContext(seatingsContext);

  const grid = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [openModal, setOpenModal] = useState({ position: 0, open: false });
  const [valueNumberTable, setValueNumberTable] = useState("");
  const [isEditPosition, setIsEditPosition] = useState({
    tableId: 0,
    open: false,
  });

  if (!changeSelectedTable || !tablesList || !addTable || !deleteTable || !editPosition) {
    return <div>Error</div>;
  }

  return (
    <motion.div layout className="tablesGrid grid w-2/5 h-full">
      {modeEdit ? (
        <>
          {grid.current.map((position) => {
            const tableAtPosition = tablesList?.find(
              (table) => table.position === position
            );

            return (
              <article
              
                className="border  flex justify-center items-center border-[#555]"
                key={position}
                id={`gridTable${position}`}
              >
                {tableAtPosition && (
                  <div
                    title={`mesa #${tableAtPosition.numberTable}`}
                    key={tableAtPosition.id}
                    id={`${tableAtPosition.position}`}
                    onMouseOver={() => {
                      if (isEditPosition.open) {
                        return;
                      }
                      setOpenModal({ position: position, open: true });
                    }}
                    onMouseLeave={() =>
                      setOpenModal({ position: position, open: false })
                    }
                    className={`bg-[#33cc55]  table-shadow ${
                      isEditPosition.open ? "" : "cursor-pointer"
                    } font-bold text-xl transition-all duration-250 w-[150px] h-[150px] absolute  flex justify-center items-center  rounded-full  `}
                  >
                    {tableAtPosition.numberTable}

                    <AnimatePresence>
                      {openModal.open && openModal.position === position && (
                        <motion.div
                          animate={{ scale: 1 }}
                          initial={{ scale: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white overflow-hidden text-grayBackground flex-col flex   absolute  z-20  items-center  w-[200px] rounded-md"
                        >
                          <ul className="flex flex-col text-center text-base font-medium w-full">
                            {/* <li className="hover:bg-amber-500  hover:text-white py-3 flex w-full items-center gap-2 justify-center">
                              <IconPencil /> Editar numero
                            </li> */}
                            <li
                              onClick={() =>
                                setIsEditPosition({
                                  tableId: tableAtPosition.id,
                                  open: true,
                                })
                              }
                              className="hover:bg-amber-500 hover:text-white py-3 flex w-full items-center gap-2 justify-center"
                            >
                              <IconArrowsMove /> Editar posicion
                            </li>
                            <li
                              onClick={() => {
                                deleteTable(tableAtPosition.id);
                                setOpenModal({
                                  position: position,
                                  open: false,
                                });
                              }}
                              className="hover:bg-red-500 text-red-500 hover:text-white py-3 flex w-full items-center gap-2 justify-center"
                            >
                              <IconTrash /> Eliminar mesa
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                {!tableAtPosition && !isEditPosition.open && (
                  <>
                    <motion.button
                      animate={{ scale: 1 }}
                      initial={{ scale: 0 }}
                      exit={{ scale: 0 }}
                      onClick={() =>
                        setOpenModal({ position: position, open: true })
                      }
                      title="Agregar una mesa"
                      className="bg-[#777] absolute rounded-md p-1"
                    >
                      <IconPlus />
                    </motion.button>
                    <AnimatePresence>
                      {openModal.open && openModal.position === position && (
                        <motion.div
                          animate={{ scale: 1 }}
                          initial={{ scale: 0 }}
                          exit={{ scale: 0 }}
                          className="bg-white flex text-grayBackground flex-col absolute gap-2 pt-5 h-[150px] z-20 overflow-hidden items-center justify-center w-[280px] rounded-md"
                        >
                          <div className="font-semibold bg-amber-500 w-full absolute top-0  pl-2 py-1 text-white flex">
                            <span>Numero de mesa</span>
                            <button
                              className="ml-auto mr-1"
                              onClick={() =>
                                setOpenModal({
                                  position: position,
                                  open: false,
                                })
                              }
                            >
                              <IconX />
                            </button>
                          </div>
                          <input
                            id="numberTable"
                            className="text-white rounded-md w-3/5 pl-2 py-2 font-bold"
                            value={valueNumberTable}
                            onChange={(e) =>
                              setValueNumberTable(e.target.value)
                            }
                            type="number"
                            placeholder="Numero de mesa"
                          />
                          <button
                            className=" bg-amber-500 text-white font-medium rounded-md px-2 py-1"
                            onClick={() => {
                              addTable(position, Number(valueNumberTable));
                              setOpenModal({
                                position: position,
                                open: false,
                              });
                            }}
                          >
                            Aceptar
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
                <AnimatePresence>
                  {!tableAtPosition && isEditPosition.open && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      onClick={() => {
                        editPosition(position, isEditPosition.tableId);
                        setIsEditPosition({ tableId: 0, open: false });
                      }}
                      className="bg-[#999] animate-pulse w-full h-full"
                    ></motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </>
      ) : (
        <>
          {grid.current.map((position) => {
            const tableAtPosition = tablesList?.find(
              (table) => table.position === position
            );
            const tableStyleStatus = tableAtPosition?.currentSale
              ?  "bg-[#f22]  table-shadow--active" 
              : "bg-[#33cc55] table-shadow" ;

            const selectedTableStyle =
              selectedTable?.id === tableAtPosition?.id
                ? "shadow-2xl shadow-white/70"
                : "";
            return (
              <article
                className="border  flex justify-center items-center border-[#555]"
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
                    className={` ${tableStyleStatus} ${selectedTableStyle} cursor-pointer w-[150px] h-[150px] font-bold transition-all duration-250  text-xl  flex justify-center items-center  rounded-full  `}
                  >
                    {tableAtPosition.numberTable}
                  </motion.div>
                )}
              </article>
            );
          })}
        </>
      )}
    </motion.div>
  );
};
