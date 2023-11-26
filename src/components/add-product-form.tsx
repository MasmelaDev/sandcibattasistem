import { useRef } from "react";
import { addProduct } from "@/actions/productActions";
import { toast } from "sonner";
import Link from "next/link";
import { ExtendedCategories } from "@/types/prisma";
export const AddProductForm = ({
  selectedCategorie,
}: {
  selectedCategorie: ExtendedCategories | undefined;
}) => {
  const addProductFormRef = useRef<HTMLFormElement>(null);

  const handleAddProduct = async (formData: FormData) => {
    addProductFormRef.current?.reset();
    const { error } = await addProduct(formData);
    if (error === "P2002") {
      toast.error("Ya existe un producto con ese nombre");
    }
    if (error === "P2003") {
      toast.error("El nombre no puede estar vacio");
    }
    if (!error) {
      toast.success("Producto agregado");
    }
  };
  if (!selectedCategorie) {
    return <div className="pt-20 text-center">Categoria no encontrada</div>;
  }
  return (
    <>
      <header className="h-12 bg-[#6707fa] w-full flex items-center">
        <h2 className="pl-2 font-semibold text-white">Nuevo producto</h2>
      </header>
      <form
        className="flex flex-col gap-3 p-5 items-center"
        action={handleAddProduct}
        ref={addProductFormRef}
      >
        <label className="w-full flex  gap-1 items-center" htmlFor="name">
          <span className="w-20">Nombre</span>
          <input
            className="bg-[#fff] text-black w-2/3 rounded-md px-2 py-1 border focus:outline-none "
            type="text"
            name="name"
            id="name"
          />
        </label>
        <label className="w-full flex  gap-1 items-center" htmlFor="price">
          <span className="w-20">Precio</span>
          <input
            className="bg-[#fff] text-black w-2/3 rounded-md px-2 py-1 border focus:outline-none "
            type="number"
            name="price"
            id="price"
          />
        </label>
        <label className="w-full flex  gap-1 items-center" htmlFor="costo">
          <span className="w-20">Costo</span>
          <input
            className="bg-[#fff] text-black w-2/3 rounded-md px-2 py-1 border focus:outline-none "
            type="number"
            name="costo"
            id="costo"
          />
        </label>
        <div className="flex w-full gap-2">
          <Link
            href={`?categoria=${selectedCategorie?.id}`}
            className="border py-1 text-center rounded-md w-1/3 font-medium bg-white"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-[#777] font-medium text-white rounded-md  py-1 w-1/3"
          >
            Agregar producto
          </button>
        </div>
        <input
          type="text"
          className="hidden"
          value={String(selectedCategorie?.id)}
          readOnly
          name="categoryId"
        />
      </form>
    </>
  );
};
