import { useState } from "react";
import { Input } from "./input";
import { ExtendedCustomers } from "@/types/prisma";

export const PhoneInput = ({
  customers,
}: {
  customers: ExtendedCustomers[];
}) => {
  const [customersFiltered, setCustomersFiltered] = useState<
    ExtendedCustomers[] | null
  >(null);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customersFiltered = customers.filter((customers) =>
      customers.phone.includes(e.target.value)
    );

    setCustomersFiltered(customersFiltered);
    if (e.target.value.length === 0) {
      setCustomersFiltered(null);
    }
  };

  const fillForm = (customer: ExtendedCustomers) => {
    const inputName = document.getElementById("name") as HTMLInputElement;
    const inputPhone = document.getElementById("phone") as HTMLInputElement;
    const inputStreet = document.getElementById("street") as HTMLInputElement;
    const inputNumber = document.getElementById("number") as HTMLInputElement;
    const inputNeighborhood = document.getElementById(
      "neighborhood"
    ) as HTMLInputElement;
    inputName.value = customer.name;
    inputPhone.value = customer.phone;
    inputStreet.value = customer.address.street;
    inputNumber.value = customer.address.number;
    inputNeighborhood.value = customer.address.neighborhood.name;

    setCustomersFiltered(null);
  };
  return (
    <label htmlFor="phone" className="flex flex-col w-[360px] relative">
      Telefono
      <Input
        autoComplete="off"
        autoCorrect="off"
        pattern="^\d{3} \d{7}$"
        type="text"
        placeholder="000 0000000"
        id="phone"
        name="phone"
        onChange={handlePhoneChange}
        required
      />
      {customersFiltered && (
        <ul className="bg-white absolute w-full top-[60px]">
          {customersFiltered.map((customer) => (
            <li
              onClick={() => fillForm(customer)}
              className="w-full text-center cursor-pointer border-b hover:bg-[#eee] py-2"
              key={customer.id}
              value={customer.id}
            >
              {customer.phone}
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};
