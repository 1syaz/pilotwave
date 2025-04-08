"use client";

import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

function GoogleLoginButton() {
  const handleLoginWithGoogle = () => {
    signIn("google");
  };

  return (
    <Button
      onClick={handleLoginWithGoogle}
      variant="outline"
      className="flex items-center gap-5"
    >
      <FcGoogle /> Continue with Google
    </Button>
  );
}

export default GoogleLoginButton;
