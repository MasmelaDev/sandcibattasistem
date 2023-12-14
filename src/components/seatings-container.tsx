'use client'
import { AnimatePresence } from "framer-motion";
import { SeatingsGrid } from "./seatings-grid";
import { SeatingMenu } from "./seating-menu";
import { useContext } from "react";
import { seatingsContext } from "@/context/seatings-context";
import { IconEdit, IconDoorExit } from "@tabler/icons-react";
import { SalesInRestaurantTables } from "./sales-in-restaurant-tables";
export const SeatingsContainer =  () => {
  const { modeEdit, salesToday, changeModeEdit, selectedTable } =
    useContext(seatingsContext);
  return (
    <>
      <SeatingsGrid />
      <div className=" w-3/5 flex flex-col h-full relative overflow-y-auto p-5 pt-16">
        <button
          className="bg-grayBackground text-white p-1 absolute rounded-md top-5 left-3"
          onClick={changeModeEdit}
          title="Modo edicion de mesas"
        >
          {modeEdit ? <IconDoorExit /> : <IconEdit />}
        </button>

        <SalesInRestaurantTables sales={salesToday} />
        <AnimatePresence>{selectedTable && <SeatingMenu selectedTable={selectedTable} />}</AnimatePresence>
      </div>
    </>
  );
};
