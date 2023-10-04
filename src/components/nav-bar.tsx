import React from "react";
import { routes } from "@/libs/routes";
import Link from "next/link";
export const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-2">
        {routes.map((route) => (
          <li key={route.route}>
            <Link href={route.route}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
