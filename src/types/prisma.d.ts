import {
  type tables,
  type sales,
  type productsInSale,
  type products,
  type categories,
  type salesInRestaurant,
  type salesInDelivery
} from "@prisma/client";

export type ExtendedProductsInSale = productsInSale & {
  product: products;
};

export type ExtendedCategories = categories & {
  products: products[];
};
export type ExtendedTables = tables & {
  currentSale: ExtendedSales;
};
export type ExtendedSalesInRestaurant = salesInRestaurant &{
  table:tables
}
export type ExtendedSales = sales & {
  productsInSale: ExtendedProductsInSale[]
  salesInRestaurant:ExtendedSalesInRestaurant
  salesInDelivery:salesInDelivery
  ;
};
