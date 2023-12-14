import React, { ChangeEvent, InputHTMLAttributes } from "react";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const Input = (props: MyInputProps) => {
  return (
    <input
      className="bg-[#fff] text-black  rounded-md px-2 py-1 border focus:outline-none"
      {...props}
    />
  );
};
