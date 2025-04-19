"use client";

import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { Button } from "@/app/_components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ redirect: true, callbackUrl: "/login" });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full outline-none focus:outline-none ">
      <Button
        onClick={handleLogOut}
        variant="ghost"
        className="w-full outline:none focus:outline-none"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FiLogOut />
            Log out
          </>
        )}
      </Button>
    </div>
  );
}

export default LogoutButton;
