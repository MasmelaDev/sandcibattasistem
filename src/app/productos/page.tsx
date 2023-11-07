import { type ExtendedCategories } from "@/types/prisma";
import Link from "next/link";
import { CategoryTable } from "@/components/category-table";
import { IconEdit, IconPlus } from "@tabler/icons-react";

import { CreateCategory } from "@/components/create-category";
const getCategories = async (): Promise<ExtendedCategories[]> => {
  const res = await fetch(`${process.env.API_URL}/categories`, {
    cache: "no-cache",
  });
  const data = await res.json();

  return data;
};

const ProductosPage = async ({
  searchParams,
}: {
  searchParams: { categoria: string; producto: string };
}) => {
  const categories = await getCategories();
  const selectedCategorie = categories.find(
    (categorie) => categorie.id === +searchParams.categoria
  );
  const selectedProduct = selectedCategorie?.products.find(
    (product) => product.id === +searchParams.producto
  );

  return (
    <section className="productsGrid ">
      <aside className="text-white bg-[#555] overflow-y-auto">
        <ul className="flex flex-col ">
          <li className="h-12 flex pl-2 font-medium items-center text-xl bg-[#444]">
            <h2 className="">Categorias</h2>
          </li>
          {categories.map((categorie) => (
            <li className="h-12" key={categorie.id}>
              <Link
                className={`h-full font-medium flex items-center text-lg w-full transition-colors duration-300 ${
                  categorie.id === +searchParams.categoria && "bg-amber-500"
                }  px-4`}
                href={`?categoria=${categorie.id}`}
              >
                {categorie.name}
              </Link>
            </li>
          ))}
        </ul>
        <CreateCategory />
      </aside>
      <section className="w-full  flex bg-white ">
        <article className="w-full p-5 flex flex-col">
          <article className="flex  justify-end gap-2">
            {selectedCategorie && (
              <>
                <button className="mb-5 flex gap-2 text-white bg-[#777] rounded p-2 ">
                  <IconPlus /> Agregar un producto
                </button>
                <button className="mb-5 flex gap-2 text-white bg-[#777] rounded p-2 ">
                  <IconEdit /> Editar categoria
                </button>
              </>
            )}
          </article>
          <CategoryTable
            selectedCategorie={selectedCategorie}
            searchParams={searchParams}
          />
        </article>
      </section>
      <section className="bg-[#f6f6f6] border-l  flex  flex-col">
        {selectedProduct ? (
          <>
            <header className="h-12 bg-[#6707fa] w-full flex items-center">
              <h2 className="pl-2 font-semibold text-white">
                {selectedProduct.name}
              </h2>
            </header>
            <ul className="p-2">
              <li>
                <span className="font-medium">Categoria: </span>{" "}
                {selectedCategorie?.name}
              </li>
              <li>
                <span className="font-medium">
                  Costo: {selectedProduct.costo}
                </span>{" "}
              </li>
              <li>
                <span className="font-medium">Precio: </span>{" "}
                {selectedProduct.price}
              </li>
              <li>
                <span className="font-medium">Id: </span> {selectedProduct.id}
              </li>
            </ul>
          </>
        ) : (
          <>
            <header className="h-12 bg-[#eee] w-full flex items-center"></header>
            <p className="pt-10 self-center">
              Selecciona un producto de el listado
            </p>
          </>
        )}
      </section>
    </section>
  );
};

export default ProductosPage;
