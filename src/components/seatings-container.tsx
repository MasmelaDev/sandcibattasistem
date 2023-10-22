'use client'
import { AnimatePresence } from "framer-motion";
import { SeatingsGrid } from "./seatings-grid";
import { SeatingMenu } from "./seating-menu";
import { useContext } from "react";
import { seatingsContext } from "@/context/seatings-context";
import { IconEdit, IconDoorExit } from "@tabler/icons-react";
import { Tables } from "./tables";
export const SeatingsContainer =  () => {
  const { modeEdit, salesToday, changeModeEdit, selectedTable } =
    useContext(seatingsContext);
  return (
    <>
      <SeatingsGrid />
      <div className="h-full w-3/5 flex flex-col  relative overflow-y-auto p-5 pt-16">
        <button
          className="bg-grayBackground text-white p-1 absolute rounded-md top-5 left-3"
          onClick={changeModeEdit}
          title="Modo edicion de mesas"
        >
          {modeEdit ? <IconDoorExit /> : <IconEdit />}
        </button>

        <Tables sales={salesToday} />
        <AnimatePresence>{selectedTable && <SeatingMenu selectedTable={selectedTable} />}</AnimatePresence>
      </div>
    </>
  );
};
