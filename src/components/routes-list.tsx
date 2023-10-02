"use client";
import { motion } from "framer-motion";

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
        <motion.article className="w-96 h-96 flex justify-center items-center rounded-lg bg-white" key={route.route}>
          <p>{route.label}</p>
        </motion.article>
      ))}
    </>
  );
};
