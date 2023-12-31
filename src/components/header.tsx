"use client";
import { useSession } from "next-auth/react";
import { UserDropdown } from "./user-dropdown";
import { usePathname } from "next/navigation";
import { Navbar } from "./nav-bar";
export const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <>
        <header className="flex fixed w-full shadow-xl shadow-black/20  bg-amber-500 px-4 py-2 h-14 ">
          {pathname !== "/" && <Navbar />}
         
          {session?.user && (
            <div className="ml-auto ">
              <UserDropdown session={session} />
            </div>
              )}
        </header>
    </>
  );
};
