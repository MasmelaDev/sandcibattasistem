"use client";

import { createContext, useState } from "react";
import { type tables } from "@prisma/client";

interface MyContextData {
    selectedTable?:tables | null,
    changeSelectedTable?:(tables:tables | null)=>void,
    tables?:tables[]
}
export const seatingsContext = createContext<MyContextData>({});

export const SeatingsProvider = ({
  children,
  tables
}: {
  children: React.ReactNode;
  tables:tables[]
}) => {

    const [selectedTable, setSelectedTable] = useState<tables | null>(null);
    const changeSelectedTable = (table:tables | null) => {
      setSelectedTable(table);
    };
  return <seatingsContext.Provider value={{selectedTable,changeSelectedTable,tables}}>{children}</seatingsContext.Provider>;
};
