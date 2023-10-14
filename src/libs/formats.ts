import {type ExtendedProductsInSale } from "@/types/prisma";

export const formatPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits:0
  });

export  const calculateTotal = (productsInSale:ExtendedProductsInSale[])=>{
  const total = productsInSale?.reduce((acc,current)=>{
    return (acc + current.total)
  },0)

  return formatPrice.format(total)
}