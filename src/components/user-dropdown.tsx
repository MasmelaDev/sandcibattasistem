import React from "react";
import { type Session } from "next-auth";

import { signOut } from "next-auth/react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

type Props = {
  session: Session;
};

export function UserDropdown({ session }: Props) {
  const handleSignOut = () =>{
    signOut()
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          src=""
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" textValue="profile">
          <p className="font-semibold">{session.user?.name}</p>
        </DropdownItem>

        <DropdownItem  onClick={handleSignOut} key="logout" textValue="Sign out" className="text-red-500" color="danger" >
        Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
