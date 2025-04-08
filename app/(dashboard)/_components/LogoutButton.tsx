"use client";

import { Button } from "@/app/_components/ui/button";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

function LogoutButton() {
  const handleLogOut = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
  };
  return (
    <div className="w-full outline-none focus:outline-none ">
      <Button
        onClick={handleLogOut}
        variant="ghost"
        className="w-full outline:none focus:outline-none"
      >
        <FiLogOut />
        Log out
      </Button>
    </div>
  );
}

export default LogoutButton;
