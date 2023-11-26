import { useRef, useEffect, useState } from "react";
import { editProduct } from "@/actions/productActions";
import { toast } from "sonner";
import { type products } from "@prisma/client";
import { ExtendedCategories } from "@/types/prisma";
import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
export const EditProductForm = ({
  selectedProduct,
  categories,
}: {
  selectedProduct: products | undefined;
  categories: ExtendedCategories[];
}) => {
  const editProductFormRef = useRef<HTMLFormElement>(null);

  const handleEditProduct = async (formData: FormData) => {
    editProductFormRef.current?.reset();
    const { error } = await editProduct(formData);

    if (error === "P2002") {
      toast.error("Ya existe un producto con ese nombre");
    }
    if (error === "P2003") {
      toast.error("Error");
    }
    if (!error) {
      toast.success("Producto Actualizado");
    }
  };
  const [active, setActive] = useState<boolean | undefined>(false);
  useEffect(() => {
    const nameInput = document.querySelector<HTMLInputElement>("#name");
    const priceInput = document.querySelector<HTMLInputElement>("#price");
    const costoInput = document.querySelector<HTMLInputElement>("#costo");
    const activeInput = document.querySelector<HTMLInputElement>("#active");
    activeInput?.setAttribute("value", String(selectedProduct?.active));
    setActive(selectedProduct?.active);
    nameInput?.setAttribute("value", selectedProduct?.name || "");
    priceInput?.setAttribute("value", String(selectedProduct?.price));
    if (selectedProduct?.costo) {
      costoInput?.setAttribute("value", String(selectedProduct?.costo));
    } else {
      costoInput?.setAttribute("value", "0");
    }
  }, [selectedProduct]);



  if (!selectedProduct){
    return <div className="pt-20 text-center">Producto no encontrado</div>
  }

  return (
    <>
      <header className="h-12 bg-[#6707fa] w-full flex items-center">
        <h2 className="pl-2 font-semibold text-white">
          {selectedProduct?.name}
        </h2>
      </header>
      <form
        className="flex flex-col gap-3 p-5 items-center"
        action={handleEditProduct}
        ref={editProductFormRef}
      >
        <label className="w-full flex  gap-2 items-center" htmlFor="name">
          <span className="w-20">Nombre</span>
          <input
            className="bg-[#fff] text-black w-2/3 rounded-md px-2 py-1 border focus:outline-none "
            type="text"
            name="name"
            id="name"
          />
        </label>
        <label className="w-full flex  gap-2 items-center" htmlFor="name">
          <span className="w-20">Categoria</span>
          <select
            defaultValue={selectedProduct?.categoryId}
            className="bg-[#fff] text-black w-2/3 rounded-md px-2 py-1 border focus:outline-none"
            name="categoryId"
          >
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.name}
              </option>
            ))}
          </select>
        </label>
        <label className="w-full flex  gap-2 items-center" htmlFor="price">
          <span className="w-20">Precio</span>
          <input
            className="bg-[#fff] text-black w-2/3 rounded-md px-2 py-1 border focus:outline-none "
            type="number"
            name="price"
            id="price"
          />
        </label>
        <label className="w-full flex  gap-2 items-center" htmlFor="costo">
          <span className="w-20">Costo</span>
          <input
            className="bg-[#fff] text-black w-2/3 rounded-md px-2 py-1 border focus:outline-none "
            type="number"
            name="costo"
            id="costo"
          />
        </label>

        <label className="w-full flex  gap-2 items-center" htmlFor="active">
          <span className="w-20">Activo</span>
          <div className="relative flex justify-center items-center ">
            <input
              id="active"
              name="active"
              type="checkbox"
              onChange={(e) => setActive(!active)}
              value={String(active)}
              className={`bg-white border  text-white appearance-none transition-all w-5 h-5 ${
                active && "border-green-500"
              }`}
             checked={active}
            />
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.15 }}
                  exit={{ scale: 0 }}
                  className="absolute"
                >
                  <IconCheck size={20}  className="text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </label>
        <div className="flex w-full gap-2">
          <Link
            href={`?categoria=${selectedProduct?.categoryId}&modo=verProducto&producto=${selectedProduct?.id}`}
            className="border py-1 text-center rounded-md w-1/3 font-medium bg-white"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-[#777] font-medium text-white rounded-md  py-1 px-1 w-1/3"
          >
            Actualizar producto
          </button>
        </div>
        <input
          type="text"
          className="hidden"
          value={String(selectedProduct?.id)}
          readOnly
          name="productId"
        />
      </form>
    </>
  );
};
