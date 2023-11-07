

import Link from "next/link";
import { IconArrowBack } from "@tabler/icons-react";

export const Navbar = () => {
  return (
    <nav className="flex items-center">
      <ul className="">
        <Link className="text-white" href='/'><IconArrowBack/></Link>
      </ul>
    </nav>
  );
};
