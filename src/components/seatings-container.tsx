"use client";
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
      <div className="h-full w-3/5 flex flex-col relative">
        <button
          className="bg-grayBackground p-1 rounded-md mr-auto m-3"
          onClick={changeModeEdit}
          title="Modo edicion de mesas"
        >
          {modeEdit ? <IconDoorExit /> : <IconEdit />}
        </button>

        <Tables sales={salesToday} />
        <AnimatePresence>{selectedTable && <SeatingMenu />}</AnimatePresence>
      </div>
    </>
  );
};
