"use client";
import { CategorySelect } from "./category-select";
import { IconTrash } from "@tabler/icons-react";
import { products } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "@/libs/formats";

type productsInSaleListToAdd = {
  amount: number;
  total: number;
  productId: number;
  product: products;
};
export const DeliveryProductsTable = ({
  productsInSaleList,
  updateProductInSaleList,
}: {
  productsInSaleList: productsInSaleListToAdd[];
  updateProductInSaleList: (
    productInSaleList: productsInSaleListToAdd[]
  ) => void;
}) => {
  const addProductToSale = (product: products) => {
    const productInList = productsInSaleList.find(
      (productInList) => productInList.productId === product.id
    );

    if (productInList) {
      updateProductInSaleList(
        productsInSaleList.map((productInList) => {
          if (productInList.productId === product.id) {
            return {
              ...productInList,
              amount: productInList.amount + 1,
              total: productInList.total + product.price,
            };
          }
          return productInList;
        })
      );
    } else {
      updateProductInSaleList([
        ...productsInSaleList,
        {
          productId: product.id,
          amount: 1,
          total: product.price,
          product,
        },
      ]);
    }
  };
  const deleteProductInSale = (productId: number) => {
    const productsInSaleListFiltered = productsInSaleList.filter(
      (productInSale) => productId !== productInSale.productId
    );
    console.log(productsInSaleListFiltered);
    updateProductInSaleList(productsInSaleListFiltered);
  };
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: ({ delay }: { delay: number }) => ({
      opacity: 1,
      transition: { delay, duration: 0.5 },
    }),
  };
  return (
    <>
      <div>
        <CategorySelect addProductToSale={addProductToSale} />
      </div>
      <div className="w-full p-5">
        <table className="w-full text-[#555] font-medium rounded-md overflow-hidden">
          <thead>
            <tr className="bg-green-400 font-semibold text-white">
              <th>Cant</th>
              <th>Producto</th>
              <th>Total</th>
              <th className="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {productsInSaleList?.map((productInSale, index) => (
                <motion.tr
                  initial="hidden"
                  variants={variants}
                  animate="visible"
                  custom={{ delay: (index + 1) * 0.2 }}
                  exit="hidden"
                  className="border h-12"
                  key={productInSale.productId}
                >
                  <td>{productInSale.amount}</td>
                  <td>{productInSale.product.name}</td>
                  <td>{formatPrice.format(productInSale.total)}</td>
                  <td className="flex h-12 w-full justify-center items-center">
                    <button
                      onClick={() =>
                        deleteProductInSale(productInSale.productId)
                      }
                      type="button"
                    >
                      <IconTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </>
  );
};
