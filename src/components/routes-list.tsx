"use client";
import { motion } from "framer-motion";
import Link from "next/link";
const routes = [
  { label: "Mesas", route: "/mesas" },
  { label: "Domicilios", route: "/domicilios" },
  { label: "Ventas", route: "/ventas" },
  { label: "Clientes", route: "/clientes" },
  { label: "Gastos", route: "/gastos" },
  { label: "Productos", route: "/productos" },
];
export const RoutesList = () => {
  return (
    <>
      {routes.map((route) => (
        
        <motion.article className="w-72 h-72 rounded-lg bg-white" key={route.route}>
          <Link href={route.route} className="w-full h-full flex justify-center items-center ">
          {route.label} 
          </Link>
        </motion.article>
      ))}
    </>
  );
};
