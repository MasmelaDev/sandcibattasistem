'use client'
import { formatPrice } from "@/libs/formats";
import { type ExtendedCategories } from "@/types/prisma";
import { useRouter } from "next/navigation";
export const CategoryTable = ({selectedCategorie, searchParams}:{selectedCategorie:ExtendedCategories | undefined ,searchParams: { categoria: string; producto: string }}) => {
    const router = useRouter()
    const selectProduct = (href:string) => {
        router.push(href)
    }
    return(
      <table className="w-full rounded-md overflow-hidden ">
      <thead>
        <tr className="bg-[#f2f2f2] text-[#888] ">
          <th className="font-medium">Id</th>
          <th className="font-medium">Producto</th>
          <th className="font-medium">Costo</th>
          <th className="font-medium">Ganancia</th>
          <th className="font-medium">Precio</th>
        </tr>
      </thead>
      <tbody>
        {selectedCategorie?.products.map((product) => (
          <tr style={{backgroundColor:product.id === +searchParams.producto ? "#ffdd77":""}} onClick={()=>selectProduct(`?categoria=${selectedCategorie.id}&producto=${product.id}`)} key={product.id} className={`border even:bg-[#f6f6f6] cursor-pointer hover:bg-[#FFEEBB]  h-14 `}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td></td>
            <td></td>
            <td>{formatPrice.format(product.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )
  }