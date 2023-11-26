"use client";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
export const CreateCategory = () => {
  const [category, setCategory] = useState({
    open: false,
    inputValue: "",
  });
  const router = useRouter();

  const createCategory = async () => {
    if (category.inputValue) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: "POST",
        body: JSON.stringify({ name: category.inputValue }),
      });
      const data = await res.json();
      console.log(data);
      if (data.category) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
      router.refresh();
    }

    setCategory({ open: false, inputValue: "" });
  };

  const HandleEnter = (key: string) => {
    if (key === "Enter") {
      createCategory();
    }
  };
  const handleOpen = () => {
    setCategory({ open: true, inputValue: "" });
  };
  useEffect(() => {
    if (category.open) {
      document.getElementById("inputCategory")?.focus();
    }
  }, [category.open]);
  return (
    <>
      {category.open ? (
        <div className="h-12">
          <input
            id="inputCategory"
            onBlur={createCategory}
            onKeyDown={(e) => HandleEnter(e.key)}
            onChange={(e) =>
              setCategory({ open: true, inputValue: e.target.value })
            }
            className="w-full h-full pl-2 "
            type="text"
          />
        </div>
      ) : (
        <div className="h-12">
          <button
            onClick={handleOpen}
            className={`h-full font-medium flex items-center justify-center  text-lg w-full transition-colors duration-300 hover:bg-[#666] cursor-pointer border border-white/20 border-x-0`}
          >
            <IconPlus className="w-20" />
          </button>
        </div>
      )}
    </>
  );
};
