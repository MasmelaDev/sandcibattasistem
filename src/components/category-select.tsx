import { type categories, type products } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  addProductToSale: (product: products) => void;
};
export const CategorySelect = ({ addProductToSale }: Props) => {
  const [categories, setCategories] = useState<categories[] | null>(null);
  const [products, setProducts] = useState<products[] | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`,{
        cache:"no-cache"
      });
      const data = await res.json();
      setCategories(data);
      
    };
    getCategories();
    const selectElement = document.getElementById("categoriesSelect");
    if (selectElement instanceof HTMLSelectElement) {
      selectElement.value = "default";
    }
  }, []);

  const handleSelectCategorie = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;

    const getProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`
      );
      const data = await res.json();
      setProducts(data.products);
    };
    getProducts();
  };
  if (!addProductToSale) {
    return <div>error</div>;
  }
  return (
    <>
      <select
        onChange={handleSelectCategorie}
        placeholder="Categorias"
        id="categoriesSelect"
        name="categories"
        className="w-52 rounded-md px-2 py-2 text-white"
      >
        <option value="default" disabled>
          Selecciona una categoria
        </option>
        {categories?.map((categorie) => (
          <option key={categorie.id} value={categorie.id}>
            {categorie.name}
          </option>
        ))}
      </select>
      <motion.div layout className="flex flex-wrap gap-5 bg-[#eee] p-5">
        {products?.map((product) => (
          <motion.button
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            title={product.name}
            className="text-grayBackground border active:scale-90 duration-300 border-grayBackground truncate  h-8 w-32 font-medium bg-[#e6e6e6] rounded-sm px-2 py-1"
            key={product.id}
            onClick={() => addProductToSale(product)}
          >
            {product.name}
          </motion.button>
        ))}
      </motion.div>
    </>
  );
};
