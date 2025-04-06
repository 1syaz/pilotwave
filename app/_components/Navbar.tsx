"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileNavOpen]);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#howItWorks" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="sm:px-10 px-4 p-3  w-full bg-white/80 fixed backdrop-blur-sm z-10 shadow-md shadow-gray-200/30 top-0 transition-transform duration-300">
      <nav className="gap-10 max-w-[80rem] w-full flex items-center justify-between mx-auto">
        <div className="flex items-center gap-10">
          <Logo iconColor="#111827" textColor="#fc350b" />
          <ul className="hidden items-center gap-10 text-sm lg:flex font-medium">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <li className="hover:text-primary transition-colors duration-300">
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="lg:flex hidden items-center gap-3">
          <Button variant="ghost">
            <Link href="/login">Log In</Link>
          </Button>
          <Button>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="lg:hidden items-center gap-3">
          <div
            onClick={() => setIsMobileNavOpen(true)}
            className="p-1 rounded-md cursor-pointer hover:bg-zinc-200 "
          >
            <RxHamburgerMenu size={20} fontWeight={800} />
          </div>
        </div>
      </nav>
      {isMobileNavOpen && (
        <MobileNav
          setIsMobileNav={setIsMobileNavOpen}
          isOpen={isMobileNavOpen}
          navLinks={navLinks}
        />
      )}
    </header>
  );
}

export default Navbar;
