import {
  type tables,
  type sales,
  type productsInSale,
  type products,
} from "@prisma/client";

export type ExtendedProductsInSale = productsInSale & {
  product: products;
};

export type ExtendedTables = tables & {
  currentSale: ExtendedSales;
};

export type ExtendedSales = sales & {
  table: tables;
  productsInSale: ExtendedProductsInSale[];
};
