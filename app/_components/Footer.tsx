import Link from "next/link";
import FooterNav from "./FooterNav";

function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "API", "Integrations"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Community", "Status", "Webinars   "],
    },
  ];

  return (
    <footer className="sm:px-10 px-4 sm:py-10 py-4 flex flex-col gap-10   w-full bg-white">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10 max-w-[80rem] w-full mx-auto">
        <FooterNav />
        {footerLinks.map((link) => (
          <div key={link.title} className="flex flex-col gap-3">
            <h3 className="uppercase text-sm font-semibold tracking-widest">
              {link.title}
            </h3>
            <div className="text-foreground/60 flex flex-col gap-2 text-sm">
              {link.links.map((link) => (
                <Link
                  href="#"
                  key={link}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-[80rem] w-full mx-auto text-center border-t border-foreground/20 pt-4 sm:pt-10">
        <h3 className="text-sm text-foreground/50 ">
          © 2025 PilotWave. All rights reserved.
        </h3>
      </div>
    </footer>
  );
}

export default Footer;
