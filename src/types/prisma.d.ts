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
type currentSale = salesInRestaurant & {
  sale:ExtendedSales
 }
export type ExtendedCategories = categories & {
  products: products[];
};
export type ExtendedTables = tables & {
  currentSale: currentSale;
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
