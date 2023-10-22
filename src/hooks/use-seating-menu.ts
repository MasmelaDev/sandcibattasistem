import { ChangeEvent, useEffect, useState } from "react";
import { type products } from "@prisma/client";
import {
  type ExtendedSales,
  type ExtendedProductsInSale,
} from "@/types/prisma";
import { useRouter } from "next/navigation";
type productsInSaleListToAdd = {
  amount: number;
  total: number;
  productId: number;
  product: products;
};

export const useSeatingMenu = (currentSale: ExtendedSales | undefined) => {
  const router = useRouter();
  const [productsInSaleList, setProductsInSaleList] = useState<
    ExtendedProductsInSale[]
  >([]);
  const [observations, setObservations] = useState<string | null>("");

  const [productsInSaleListToAdd, setProductsInSaleListToAdd] = useState<
    productsInSaleListToAdd[]
  >([]);
  const [totalSaleToAdd, setTotalSaleToAdd] = useState(0);

  useEffect(() => {

    if (currentSale) {
      setProductsInSaleList(currentSale.productsInSale);
      setObservations(currentSale.observations);
    } else {
      setProductsInSaleList([]);
      setObservations("");
    }
  }, [currentSale]);

  const updateObservationsValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setObservations(e.target.value);
  };

  const updateObservationInSale = async (
    saleId: number,
    observation: string | null
  ) => {
    const res = await fetch(`http://localhost:3000/api/sales/${saleId}`, {
      method: "PUT",
      body: JSON.stringify({ observations: observation }),
    });
    const data = await res.json()
    router.refresh();

  };

  const addProductToSale = (product: products) => {
    const updatedList = [...productsInSaleListToAdd];
    const productId = product.id;
    const existingProductIndex = updatedList.findIndex(
      (item) => item.productId === productId
    );

    let updatedTotalSale = totalSaleToAdd;

    if (existingProductIndex !== -1) {
      updatedList[existingProductIndex].amount++;
      updatedList[existingProductIndex].total += product.price;
    } else {
      updatedList.push({
        amount: 1,
        total: product.price,
        productId: productId,
        product: product,
      });
    }

    updatedTotalSale += product.price;
    setTotalSaleToAdd(updatedTotalSale);
    setProductsInSaleListToAdd(updatedList);
  };

  const removeProductFromSaleListToAdd = (productId: number) => {
    const updatedProductsInSaleList = productsInSaleListToAdd.map(
      (productInSale) => {
        if (
          productInSale.productId === productId &&
          productInSale.amount === 1
        ) {
          setTotalSaleToAdd((prevTotal) => prevTotal - productInSale.total);
          return null;
        } else if (
          productInSale.productId === productId &&
          productInSale.amount > 0
        ) {
          setTotalSaleToAdd(
            (prevTotal) => prevTotal - productInSale.product.price
          );
          return {
            ...productInSale,
            amount: productInSale.amount - 1,
            total: productInSale.total - productInSale.product.price,
          };
        }
        return productInSale;
      }
    );
    const filteredList = updatedProductsInSaleList.filter(
      (productInSale) => productInSale !== null
    ) as productsInSaleListToAdd[];
    setProductsInSaleListToAdd(filteredList);
  };

  const removeProductsInSaleToAdd = (productId: number) => {
    const updatedProductsInSaleList = productsInSaleListToAdd.filter(
      (productInSale) => {
        if (productInSale.productId === productId) {
          setTotalSaleToAdd((prev) => prev - productInSale.total);
        } else {
          return productInSale;
        }
      }
    );

    setProductsInSaleListToAdd(updatedProductsInSaleList);
  };

  const removeProductInSaleList = async (productInSaleId: number) => {
    const res = await fetch(
      `http://localhost:3000/api/sales/productInSale/${productInSaleId}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    const filteredList = productsInSaleList.filter(
      (productInSale) => productInSale.id !== productInSaleId
    );

    setProductsInSaleList(filteredList);
    router.refresh();
  };

  const createSeatingSale = async (tableId: number) => {
    const res = await fetch(`http://localhost:3000/api/sales`, {
      method: "POST",
      body: JSON.stringify({
        tableId: tableId,
        delivery: false,
        observations: observations,
        productsInSale: productsInSaleListToAdd,
      }),
    });
    const data = await res.json();
    setProductsInSaleList(data.productsInSaleList);
    setProductsInSaleListToAdd([]);
    setTotalSaleToAdd(0);
    router.refresh();
  };

  return {
    addProductToSale,
    updateObservationInSale,
    productsInSaleListToAdd,
    updateObservationsValue,
    removeProductInSaleList,
    totalSaleToAdd,
    productsInSaleList,
    observations,
    createSeatingSale,
    removeProductsInSaleToAdd,
    removeProductFromSaleListToAdd,
  };
};
