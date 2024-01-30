import { type ExtendedCategories } from "@/types/prisma";
import Link from "next/link";
import { CategoryTable } from "@/components/category-table";
import { CreateCategory } from "@/components/create-category";
import { CategoryOptions } from "@/components/category-options";
import { ProductsOptions } from "@/components/products-options";
const getCategories = async (): Promise<ExtendedCategories[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
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
    <section className="productsGrid">
      <aside className="text-white bg-[#555] overflow-y-auto ">
        <ul className="flex flex-col ">
          <li className="h-12 flex items-center justify-center text-xl border-b border-white/20  bg-[#444]">
            <h2 className="pl-2 font-semibold">Categorias</h2>
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
      <section className="w-full  flex flex-col bg-white ">
        <article className="w-full p-5 flex flex-col">
          <article className="flex  justify-end gap-2">
            {selectedCategorie && <CategoryOptions />}
          </article>
          <div className="max-h-[80vh] overflow-y-auto rounded-md">
            <CategoryTable
              selectedCategorie={selectedCategorie}
              searchParams={searchParams}
            />
          </div>
        </article>
      </section>

      <ProductsOptions
        categories={categories}
        selectedProduct={selectedProduct}
        selectedCategorie={selectedCategorie}
      />
    </section>
  );
};

export default ProductosPage;
