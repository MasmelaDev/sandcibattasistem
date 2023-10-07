"use client";
import { toast } from "sonner";

import { createContext, useState } from "react";
import { type tables } from "@prisma/client";
interface MyContextData {
  modeEdit?: boolean;
  changeModeEdit?: () => void;
  selectedTable?: tables | null;
  deleteTable?: (id: number) => void;
  editPosition?: (position: number, id: number) => void;
  addTable?: (position: number, numberTable: number) => void;
  changeSelectedTable?: (tables: tables | null) => void;
  tablesList?: tables[];
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
  const [tablesList, setTablesList] = useState<tables[]>(tables);

  const changeModeEdit = () => {
    setModeEdit(!modeEdit);
  };
  const changeSelectedTable = (table: tables | null) => {
    setSelectedTable(table);
  };

  const deleteTable = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/tables/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.deletedTable) {
      const filteredTableList = tablesList.filter((table) => table.id !== id);
      setTablesList(filteredTableList);
    }
  };
  const addTable = async (position: number, numberTable: number) => {
    const res = await fetch(`http://localhost:3000/api/tables`, {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify({ position, numberTable }),
    });
    const data = await res.json();

    if (data.table) {
      setTablesList([...tablesList, data.table]);
    } else {
      toast.error(data?.message);
    }
  };
  const editPosition = async (position: number, id: number) => {
    const res = await fetch(`http://localhost:3000/api/tables/${id}`, {
      cache: "no-cache",
      method: "PUT",
      body: JSON.stringify({ position }),
    });
    const data = await res.json();

    if (data) {
      const filteredTableList = tablesList.filter((table) => table.id !== id);
      setTablesList([...filteredTableList, data]);
    } 
     
    
  };
  return (
    <seatingsContext.Provider
      value={{
        modeEdit,
        editPosition,
        addTable,
        deleteTable,
        changeModeEdit,
        selectedTable,
        changeSelectedTable,
        tablesList,
      }}
    >
      {children}
    </seatingsContext.Provider>
  );
};
