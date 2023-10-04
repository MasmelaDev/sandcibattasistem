"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { routes } from "@/libs/routes";
export const RoutesList = () => {
  return (
    <>
      {routes.map((route) => (
        
        <motion.article className="w-72 h-72 rounded-lg bg-white" key={route.route}>
          <Link href={route.route} className="w-full h-full flex justify-center items-center text-black">
          {route.label} 
          </Link>
        </motion.article>
      ))}
    </>
  );
};
