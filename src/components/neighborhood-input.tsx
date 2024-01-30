import { type neighborhood } from "@prisma/client";
import { useState } from "react";
import { Input } from "./input";
export const NeighborhoodInput = ({
  neighborhoods,
}: {
  neighborhoods: neighborhood[];
}) => {
  const [showNeighborhoodsOptions, setShowNeighborhoodsOptions] =
    useState<boolean>(false);
  const [neighborhoodsFiltered, setNeighborhoodsFiltered] =
    useState<neighborhood[]>(neighborhoods);

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const neighborhoodsFiltered = neighborhoods.filter((neighborhood) =>
      neighborhood.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setNeighborhoodsFiltered(neighborhoodsFiltered);
    if (e.target.value.length === 0) {
      setShowNeighborhoodsOptions(false);
    } else {
      setShowNeighborhoodsOptions(true);
    }
  };
  const handleNeighborhoodClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const neighborhoodSelected = neighborhoods.find(
      (neighborhood) => neighborhood.name === e.currentTarget.innerText
    );
    if (!neighborhoodSelected) return;

    const neighborhoodInput = document.getElementById(
      "neighborhood"
    ) as HTMLInputElement;
    setShowNeighborhoodsOptions(false);
    neighborhoodInput.value = neighborhoodSelected.name;
  };
  return (
    <label htmlFor="neighborhood" className="flex flex-col w-[196px] relative">
      Barrio
      <Input
        autoComplete="off"
        autoCorrect="off"
        placeholder="Petruc"
        type="text"
        id="neighborhood"
        name="neighborhood"
        required
        onChange={handleNeighborhoodChange}
      />
      {showNeighborhoodsOptions && (
        <div
          className="bg-white  absolute top-[60px]    z-10 rounded-b-md font-medium shadow-md"
          id="neighborhoodsOptions"
        >
          {neighborhoodsFiltered.map((neighborhood) => (
            <span
              className="w-[196px] flex justify-center cursor-pointer border-b hover:bg-[#eee] py-2"
              onClick={handleNeighborhoodClick}
              key={neighborhood.id}
            >
              {neighborhood.name}
            </span>
          ))}
        </div>
      )}
    </label>
  );
};
