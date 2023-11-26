"use client";
import { type ExtendedCategories } from "@/types/prisma";
import { type products } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { AddProductForm } from "./add-product-form";
import { EditProductForm } from "./edit-product-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShowProduct } from "./show-product";
import { editCategory } from "@/actions/productActions";
type Props = {
  selectedCategorie: ExtendedCategories | undefined;
  selectedProduct: products | undefined;
  categories: ExtendedCategories[];
};

export const ProductsOptions = ({
  selectedCategorie,
  selectedProduct,
  categories,
}: Props) => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("modo");
  const router = useRouter();

  const deleteCategory = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${selectedCategorie?.id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (data.deletedCategorie) {
      toast.success("Categoria eliminada");
      router.push(`/productos`);
      router.refresh();
    } else {
      toast.error(data.error);
    }
  };
  const deleteProduct = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${selectedProduct?.id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (data.deletedProduct) {
      toast.success("Producto eliminado");
    } else {
      toast.error(data.error);
    }
    router.push(`/productos?categoria=${selectedCategorie?.id}`);
    router.refresh();
  };

  return (
    <section className="bg-[#f6f6f6] border-l  flex  flex-col">
      {mode === "crearProducto" && (
        <AddProductForm selectedCategorie={selectedCategorie} />
      )}
      {mode === "editarProducto" && (
        <EditProductForm
          selectedProduct={selectedProduct}
          categories={categories}
        />
      )}

      {mode === "editarCategoria" && selectedCategorie && (
        <>
          <header className="h-12 bg-[#6707fa] w-full flex items-center">
            <h2 className="pl-2 font-semibold text-white">
              {selectedCategorie?.name}
            </h2>
          </header>
          <div className=" flex flex-col items-center  pt-20 w-full">
            <h2 className=" font-medium mb-5">Nuevo nombre de categoria:</h2>
            <form
              action={editCategory}
              className="flex flex-col  w-full justify-center items-center gap-5"
            >
              <input
                name="name"
                className="bg-[#fff] text-black w-1/2 rounded-md px-2 py-1 border focus:outline-none "
                type="text"
              />
              <input
                type="text"
                className="hidden"
                value={String(selectedCategorie?.id)}
                readOnly
                name="categoryId"
              />
              <div className="flex gap-2 w-full justify-center">
                <Link
                  href={`?categoria=${selectedCategorie?.id}`}
                  className="bg-red-500 text-center font-medium text-white rounded-md w-1/3 py-1"
                >
                  Cancelar
                </Link>
                <button className="bg-green-500 text-center font-medium text-white rounded-md w-1/3 py-1">
                  Editar nombre
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {mode === "eliminarCategoria" && selectedCategorie && (
        <>
          <header className="h-12 bg-[#6707fa] w-full flex items-center">
            <h2 className="pl-2 font-semibold text-white">
              {selectedCategorie?.name}
            </h2>
          </header>
          <div className="mx-auto flex flex-col items-center pt-20">
            <h2 className=" font-medium mb-5">
              Estas seguro que quieres eliminar esta categoria ?
            </h2>
            <div className="flex gap-2 w-full justify-center">
              <Link
                href={`?categoria=${selectedCategorie?.id}`}
                className="bg-green-500 text-center font-medium text-white rounded-md w-1/3 py-1"
              >
                Cancelar
              </Link>
              <button
                onClick={deleteCategory}
                className="bg-red-500 font-medium text-white rounded-md w-1/3 py-1"
              >
                Eliminar
              </button>
            </div>
          </div>
        </>
      )}
      {mode === "eliminarProducto" && selectedProduct && (
        <>
          <header className="h-12 bg-[#6707fa] w-full flex items-center">
            <h2 className="pl-2 font-semibold text-white">
              {selectedProduct?.name}
            </h2>
          </header>
          <div className="mx-auto flex flex-col items-center pt-20">
            <h2 className=" font-medium mb-5">
              Estas seguro que quieres eliminar este Producto ?
            </h2>
            <div className="flex gap-2 w-full justify-center">
              <Link
                href={`?categoria=${selectedCategorie?.id}`}
                className="bg-green-500 text-center font-medium text-white rounded-md w-1/3 py-1"
              >
                Cancelar
              </Link>
              <button
                onClick={deleteProduct}
                className="bg-red-500 font-medium text-white rounded-md w-1/3 py-1"
              >
                Eliminar
              </button>
            </div>
          </div>
        </>
      )}

      {mode === "verProducto" && (
        <ShowProduct
          selectedCategorie={selectedCategorie}
          selectedProduct={selectedProduct}
        />
      )}
      {mode === null && (
        <>
          <header className="h-12 bg-[#eee] w-full flex items-center"></header>
          <p className="pt-10 self-center">
            Selecciona un producto de el listado
          </p>
        </>
      )}
    </section>
  );
};
