import { type categories, type products } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
export const CategorySelect = () => {
  const [categories, setCategories] = useState<categories[] | null>(null);
  const [products, setProducts] = useState<products[] | null>(null);
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleSelectCategorie = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;

    const getProducts = async () => {
      const res = await fetch(
        `http://localhost:3000/api/categories/${categoryId}`
      );
      const data = await res.json();
      setProducts(data.products);
    };
    getProducts();
  };
  return (
    <>
      <select
        onChange={handleSelectCategorie}
        placeholder="Categorias"
        id="categoriesSelect"
        name="categories"
        className="w-52 rounded-md px-2 py-2"
      >
        <option value="" disabled selected>Selecciona una categoria</option>
        {categories?.map((categorie) => (
          <option key={categorie.id} value={categorie.id}>
            {categorie.name}
          </option>
        ))}
      </select>
      <motion.div layout className="flex flex-wrap gap-5 bg-[#eee] p-5">
        {products?.map((product) => (
          <motion.button animate={{scale:1}} transition={{duration:.4}}  initial={{scale:0}} title={product.name} className="text-grayBackground border  border-grayBackground truncate  h-8 w-32 font-medium bg-[#e6e6e6] rounded-sm px-2 py-1" key={product.id}>
            {product.name}
          </motion.button>
        ))}
      </motion.div>
    </>
  );
};
