import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

function LogoutButton() {
  return (
    <div className="w-full ">
      <Button variant="ghost" className="w-full">
        <FiLogOut />
        <Link href="/login">Log out</Link>
      </Button>
    </div>
  );
}

export default LogoutButton;
