import Logo from "@/app/_components/Logo";
import image from "@/public/testimonials/image1.jpeg";
import Image from "next/image";
import CustomSideBarTrigger from "./CustomSideBarTrigger";
import { RxHamburgerMenu } from "react-icons/rx";

function DashboardNavbar() {
  return (
    <header className="fixed border-b top-0 shadow-md shadow-gray-200/30 bg-white w-screen left-0 z-10 border-foreground/10 lg:py-4 py-3 lg:px-6 px-3 flex items-center justify-between ">
      <div className="lg:flex hidden">
        <Logo iconColor="#111827" textColor="#fc350b" />
      </div>
      <div className="lg:hidden flex">
        <CustomSideBarTrigger icon={<RxHamburgerMenu size={23} />} />
      </div>
      <div className="flex items-center gap-3">
        <Image
          className="rounded-full"
          src={image}
          alt="profile"
          width={35}
          height={35}
        />
        <h2 className="text-sm font-medium">Sarah Johnson</h2>
      </div>
    </header>
  );
}

export default DashboardNavbar;
