import Link from "next/link";
import Logo from "./Logo";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { BiLogoLinkedin } from "react-icons/bi";

function FooterNav() {
  return (
    <div className="flex flex-col gap-3 ">
      <Logo iconColor="#111827" textColor="#fc350b" />
      <p className="text-sm text-foreground/60 ">
        The all-in-one platform for managing your social media presence.
      </p>
      <div className="flex flex-row gap-4">
        <Link
          href="#"
          className="text-foreground/40 hover:text-primary transition-colors duration-300"
        >
          <FiFacebook size={20} />
        </Link>
        <Link
          href="#"
          className="text-foreground/40 hover:text-primary transition-colors duration-300"
        >
          <FaXTwitter size={20} />
        </Link>
        <Link
          href="#"
          className="text-foreground/40 hover:text-primary transition-colors duration-300"
        >
          <FaInstagram size={20} />
        </Link>
        <Link
          href="#"
          className="text-foreground/40 hover:text-primary transition-colors duration-300"
        >
          <BiLogoLinkedin size={20} />
        </Link>
      </div>
    </div>
  );
}
export default FooterNav;
