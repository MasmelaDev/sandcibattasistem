import React from "react";
import Link from "next/link";
import { IconArrowBack } from "@tabler/icons-react";

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-2">
        <Link href='/'><IconArrowBack/></Link>
      </ul>
    </nav>
  );
};
