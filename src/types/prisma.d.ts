import {
  type tables,
  type sales,
  type productsInSale,
  type products,
  type categories,
  type salesInRestaurant,
  type salesInDelivery,
  type customers,
  type address,
  type domiciliary,
  type neighborhood
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
export type ExtendedAddress = address &{
  neighborhood:neighborhood
}
export type ExtendedCustomers = customers &{
  address:ExtendedAddress
}
export type ExtendedSalesInDelivery = salesInDelivery &{
  customer:ExtendedCustomers
  domiciliary:domiciliary
}
export type ExtendedSales = sales & {
  productsInSale: ExtendedProductsInSale[]
  salesInRestaurant:ExtendedSalesInRestaurant
  salesInDelivery:ExtendedSalesInDelivery;
};
