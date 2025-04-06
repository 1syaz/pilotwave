"use client";

import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

function GoogleLoginButton() {
  const handleLoginWithGoogle = () => {
    toast.success("Google login");
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
