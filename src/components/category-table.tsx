"use client";
import { formatPrice } from "@/libs/formats";
import { type ExtendedCategories } from "@/types/prisma";
import { IconCheck } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
export const CategoryTable = ({
  selectedCategorie,
  searchParams,
}: {
  selectedCategorie: ExtendedCategories | undefined;
  searchParams: { categoria: string; producto: string };
}) => {
  const router = useRouter();
  const selectProduct = (href: string) => {
    router.push(href);
  };

  const [showInactiveProducts, setShowInactiveProducts] = useState(false);
  const toggleShowInactiveProducts = () => {
    setShowInactiveProducts(!showInactiveProducts);
  };
  return (
    <>
      <label htmlFor="inactiveProducts" className="flex gap-3 mb-3 w-72">
        <div className="relative flex justify-center items-center ">
          <input
            onChange={toggleShowInactiveProducts}
            value={String(showInactiveProducts)}
            className={`bg-white border  text-white appearance-none transition-all w-5 h-5 ${
              showInactiveProducts ? "border-green-500" : "border-[#bbb]"
            }`}
            id="inactiveProducts"
            type="checkbox"
          />
          <AnimatePresence>
            {showInactiveProducts && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
                exit={{ scale: 0 }}
                className="absolute"
              >
                <IconCheck size={20} className="text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        Mostrar productos inactivos
      </label>
      <table className="w-full rounded-md  ">
        <thead>
          <tr className="bg-[#f2f2f2] text-[#888] h-14 ">
            <th className="font-medium">Id</th>
            <th className="font-medium">Producto</th>
            <th className="font-medium">Precio</th>
            <th className="font-medium">Costo</th>
            <th className="font-medium">Ganancia</th>
          </tr>
        </thead>
        <tbody className="">
          {selectedCategorie?.products.map((product) => {
            if (product.active) {
              return (
                <tr
                  style={{
                    backgroundColor:
                      product.id === +searchParams.producto ? "#ffdd77" : "",
                  }}
                  onClick={() =>
                    selectProduct(
                      `?categoria=${selectedCategorie.id}&modo=verProducto&producto=${product.id}`
                    )
                  }
                  key={product.id}
                  className={`border even:bg-[#f6f6f6] cursor-pointer hover:bg-[#FFEEBB] h-14 border-l-0 border-r-0`}
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{formatPrice.format(product.price)}</td>
                  <td>
                    {product.costo ? formatPrice.format(product.costo) : "$ 0"}
                  </td>
                  <td>
                    {product.costo
                      ? formatPrice.format(product.price - product.costo)
                      : formatPrice.format(product.price)}
                  </td>
                </tr>
              );
            } else if (showInactiveProducts) {
              return (
                <tr
                  style={{
                    backgroundColor:
                      product.id === +searchParams.producto ? "#ffdd77" : "",
                  }}
                  onClick={() =>
                    selectProduct(
                      `?categoria=${selectedCategorie.id}&modo=verProducto&producto=${product.id}`
                    )
                  }
                  key={product.id}
                  className={`border opacity-50 cursor-pointer hover:bg-[#FFEEBB] h-14 border-l-0 border-r-0`}
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{formatPrice.format(product.price)}</td>
                  <td>
                    {product.costo ? formatPrice.format(product.costo) : "$ 0"}
                  </td>
                  <td>
                    {product.costo
                      ? formatPrice.format(product.price - product.costo)
                      : formatPrice.format(product.price)}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};
