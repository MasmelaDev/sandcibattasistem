import { ChangeEvent, useEffect, useState, useRef } from "react";
import { type products } from "@prisma/client";
import { motion } from "framer-motion";
type Props = {
  addProductToSale: (product: products) => void;
};
export const ProductInput = ({ addProductToSale }: Props) => {
  const [inputProduct, setInputProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<products[]>([]);
  const [counter, setCounter] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState<
    number | undefined
  >(undefined);
  const allProducts = useRef<products[]>();
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();
      allProducts.current = data.products;
    };
    getProducts();
  }, []);
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputProduct(e.target.value);
    if (allProducts.current) {
      const newFilteredProducts = allProducts.current.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setFilteredProducts(newFilteredProducts);
      if (newFilteredProducts.length) {
        setSelectedProductId(newFilteredProducts[0].id);
      }
    }
  };
  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      addProductToSale(filteredProducts[counter]);
      setCounter(0);
      setInputProduct("");
    }
    if (key === "Backspace") {
      setCounter(0);
    }
    if (key === "ArrowDown") {
      if (counter < filteredProducts.length - 1) {
        setCounter((prev) => prev + 1);
        setSelectedProductId(filteredProducts[counter + 1].id);
      }
    }
    if (key === "ArrowUp") {
      if (counter > 0) {
        setCounter((prev) => prev - 1);
        setSelectedProductId(filteredProducts[counter - 1].id);
      }
    }
  };
  return (
    <label className="flex flex-col relative">
      <input
        placeholder="Buscar producto..."
        type="text"
        value={inputProduct}
        onChange={(e) => handleChangeInput(e)}
        onKeyDown={(e) => handleKeyDown(e.key)}
        className="bg-[#eee] w-full focus:outline-none focus:ring-transparent text-grayBackground pl-3 py-3 rounded-sm placeholder:text-[#888]"
      />
      {inputProduct && (
        <ul className="bg-white absolute w-full top-12 border z-30  border-amber- border-t-0">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <li
                onClick={() => {
                  addProductToSale(product);
                  setInputProduct("");
                }}
                className={`h-12 px-2 flex items-center hover:bg-amber-300 gap-2 ${
                  selectedProductId === product.id && "bg-amber-300"
                }`}
                key={product.id}
              >
                <span className="font-medium">{product.id}</span> -
                <span>{product.name}</span>
              </li>
            ))
          ) : (
            <li className="h-12 px-2 flex items-center">
              No se encontro el producto
            </li>
          )}
        </ul>
      )}
    </label>
  );
};
