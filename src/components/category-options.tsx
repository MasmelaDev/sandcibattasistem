"use client";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export const CategoryOptions = () => {
  const searchParams = useSearchParams();
  const selectedCategorie = searchParams.get("categoria");

  return (
    <>
      <Link
        href={`?categoria=${selectedCategorie}&modo=crearProducto`}
        className="mb-5 flex gap-2 text-white bg-[#777] rounded p-2 "
      >
        <IconPlus /> Agregar un producto
      </Link>
      <Link
        href={`?categoria=${selectedCategorie}&modo=editarCategoria`}
        className="mb-5 flex gap-2 text-white bg-[#777] rounded p-2 "
      >
        <IconEdit /> Editar categoria
      </Link>
      <Link
        href={`?categoria=${selectedCategorie}&modo=eliminarCategoria`}
        className="mb-5 flex gap-2 text-white bg-[#777] rounded p-2 "
      >
        <IconTrash /> Eliminar categoria
      </Link>
    </>
  );
};
