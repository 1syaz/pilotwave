"use client";

import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "./ui/button";

interface IMobileNavProps {
  setIsMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  navLinks: {
    name: string;
    href: string;
  }[];
}

function MobileNav({ setIsMobileNav, isOpen, navLinks }: IMobileNavProps) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsRendered(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsRendered(false);

    setTimeout(() => {
      setIsMobileNav(false);
    }, 300);
  };

  return (
    <div
      className={`sm:px-10 px-4 p-[11px] absolute top-0 left-0 right-0 bottom-0 h-dvh w-full  bg-background-secondary lg:hidden flex flex-col gap-10 transition-all duration-300 ease-in-out ${
        isRendered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <header className="flex items-center gap-10 w-full justify-between">
        <Logo iconColor="#111827" textColor="#fc350b" />
        <div
          onClick={handleClose}
          className="p-1 rounded-md cursor-pointer hover:bg-zinc-200 transition-colors"
        >
          <MdClear size={22} />
        </div>
      </header>
      <div className="flex-1 flex flex-col gap-10 justify-between pb-5">
        <ul className="flex flex-col ">
          {navLinks.map((link) => (
            <li key={link.name} className="inline-block w-fit ">
              <Link
                href={link.href}
                onClick={handleClose}
                className="block px-4 py-2 text-lg font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="self-end">
          <Button variant="ghost">
            <Link href="/login">Log In</Link>
          </Button>
          <Button>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
