import { type ExtendedCategories } from "@/types/prisma";
import Link from "next/link";
import { CategoryTable } from "@/components/category-table";
import { IconPlus } from "@tabler/icons-react";

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
    <>
      <section className="w-full h-screen shadow bg-white shadow-black/30 flex ">
        <article className="flex flex-col w-4/6 h-full">
     
          <div className="flex w-full  ">
            <aside className="h-full text-white w-3/12 overflow-y-auto bg-[#555] pt-5">
              <ul>
                {categories.map((categorie) => (
                  <li key={categorie.id}>
                    <Link
                      className={`h-12 font-medium flex items-center text-lg w-full transition-colors duration-300 ${
                        categorie.id === +searchParams.categoria &&
                        "bg-amber-500"
                      }  px-4`}
                      href={`?categoria=${categorie.id}`}
                    >
                      {categorie.name}
                    </Link>
                  </li>
                ))}
              <CreateCategory/>
              </ul>
            </aside>
            <article className="w-9/12 p-5 flex flex-col">
              {selectedCategorie && (
                <button className="mb-5 flex gap-2 text-white bg-[#777] rounded p-2 ml-auto">
                  <IconPlus /> Agregar un producto
                </button>
              )}
              <CategoryTable
                selectedCategorie={selectedCategorie}
                searchParams={searchParams}
              />
            </article>
          </div>
        </article>
        <article className="bg-[#f6f6f6] border-l w-2/6 flex  flex-col">
          {selectedProduct ? (
            <>
              <header className="h-[7%] bg-[#6707fa] w-full flex items-center">
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
              <header className="h-[7%] bg-[#eee] w-full flex items-center"></header>
              <p className="pt-10 self-center">
                Selecciona un producto de el listado
              </p>
            </>
          )}
        </article>
      </section>
    </>
  );
};

export default ProductosPage;
