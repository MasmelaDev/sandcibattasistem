import { IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { formatPrice } from "@/libs/formats";
import { products } from "@prisma/client";
import { ExtendedCategories } from "@/types/prisma";
type Props = {
  selectedProduct: products | undefined;
  selectedCategorie: ExtendedCategories | undefined;
};
export const ShowProduct = ({ selectedProduct, selectedCategorie }: Props) => {
  if (!selectedProduct) {
    return (
      <>
        <header className="h-12 bg-[#eee] w-full flex items-center"></header>
        <div className="pt-20 text-center">Producto no encontrado</div>
      </>
    );
  }
  return (
    <>
      <header className="h-12 bg-[#6707fa] w-full flex items-center">
        <h2 className="pl-2 font-semibold text-white">
          {selectedProduct.name}
        </h2>
        <Link
          className="text-white ml-auto mr-2"
          title="Editar producto"
          href={`?categoria=${selectedProduct?.categoryId}&modo=editarProducto&producto=${selectedProduct.id}`}
        >
          <IconEdit />
        </Link>
        <Link
          className="text-white  mr-2"
          title="Eliminar producto"
          href={`?categoria=${selectedProduct?.categoryId}&modo=eliminarProducto&producto=${selectedProduct.id}`}
        >
          <IconTrash />
        </Link>
      </header>
      <ul className="p-3 flex flex-col gap-5 mt-5">
        <li className="flex">
          <span className="mr-8 w-24 ">Categoría: </span>
          <span className="font-medium">{selectedCategorie?.name}</span>
        </li>
        <li className="flex">
          <span className="mr-8 w-24 ">Id: </span>
          <span className="font-medium">{selectedProduct.id}</span>
        </li>
        <li className="flex">
          <span className="mr-8 w-24 ">Costo:</span>
          <span className="font-medium">
            {selectedProduct.costo
              ? formatPrice.format(selectedProduct.costo)
              : "$ 0"}
          </span>
        </li>
        <li className="flex">
          <span className="mr-8 w-24 ">Precio: </span>
          <span className="font-medium">
            {formatPrice.format(selectedProduct.price)}
          </span>
        </li>
        <li className="flex">
          <span className="mr-8 w-24 ">Activo: </span>
          <span className="font-medium">
            {selectedProduct.active ? "Si" : "No"}
          </span>
        </li>
      </ul>
    </>
  );
};
