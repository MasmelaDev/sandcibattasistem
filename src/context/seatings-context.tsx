"use client";

import { createContext, useState } from "react";
import { type tables } from "@prisma/client";

interface MyContextData {
  modeEdit?: boolean;
  changeModeEdit?: () => void;
  selectedTable?: tables | null;
  addTable?: ({position,numberTable}:{position:number,numberTable:number}) => void;
  changeSelectedTable?: (tables: tables | null) => void;
  tables?: tables[];
}
export const seatingsContext = createContext<MyContextData>({});

export const SeatingsProvider = ({
  children,
  tables,
}: {
  children: React.ReactNode;
  tables: tables[];
}) => {
  const [selectedTable, setSelectedTable] = useState<tables | null>(null);
  const [modeEdit, setModeEdit] = useState(false);
  const changeModeEdit = () => {
    setModeEdit(!modeEdit);
  };
  const changeSelectedTable = (table: tables | null) => {
    setSelectedTable(table);
  };
  const addTable = ({position,numberTable}:{position:number,numberTable:number}) => {
    console.log("s")
  }
  return (
    <seatingsContext.Provider
      value={{
        modeEdit,
        addTable,
        changeModeEdit,
        selectedTable,
        changeSelectedTable,
        tables,
      }}
    >
      {children}
    </seatingsContext.Provider>
  );
};
