"use client";
import { useSession } from "next-auth/react";
import { UserDropdown } from "./user-dropdown";
import { usePathname } from "next/navigation";
import { Navbar } from "./nav-bar";
export const Header = () => {
  const { data: session  } = useSession();
  const pathname = usePathname()
  return (
    <>
      {session?.user && (
        <header className="flex fixed w-full bg-grayBackground px-4 py-2  ">
          {
            pathname !== "/" && <Navbar/>
          }
          <div className="ml-auto ">
            <UserDropdown session={session} />
          </div>
        </header>
      )}
    </>
  );
};
