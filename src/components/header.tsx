"use client";
import { useSession } from "next-auth/react";
import { UserDropdown } from "./user-dropdown";
export const Header = () => {
  const { data: session  } = useSession();
  return (
    <>
      {session?.user && (
        <header className="flex fixed w-full bg-grayBackground px-4 py-2  ">
          <div className="ml-auto ">
            <UserDropdown session={session} />
          </div>
        </header>
      )}
    </>
  );
};
