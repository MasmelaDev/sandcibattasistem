"use client";
import { AnimatePresence } from "framer-motion";
import { SeatingsGrid } from "./seatings-grid";
import { SeatingMenu } from "./seating-menu";
import { useContext } from "react";
import { seatingsContext } from "@/context/seatings-context";

export const SeatingsContainer = () => {
    const { selectedTable} = useContext(seatingsContext);
  return (
    <>
      <SeatingsGrid
      
      />
      <div className="h-full w-3/5 bg-[#ddd]">
        <AnimatePresence>
          {selectedTable && <SeatingMenu  />}
        </AnimatePresence>
      </div>
    </>
  );
};
