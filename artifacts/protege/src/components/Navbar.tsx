import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#home", label: "HOME" },
  { href: "#quem-somos", label: "QUEM SOMOS" },
  { href: "#servicos", label: "SERVIÇOS" },
  { href: "#projetos", label: "PROJETOS" },
  { href: "#temas", label: "TEMAS" },
  { href: "#contato", label: "CONTATO" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="caution-stripe h-[6px] w-full fixed top-0 z-50" />
      <nav
        className={cn(
          "fixed top-[6px] left-0 right-0 z-40 transition-all duration-300 bg-primary/95 backdrop-blur-md",
          isScrolled ? "shadow-lg py-2" : "py-4"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => scrollTo(e, "#home")}
            className="flex items-center gap-3 z-50 group"
          >
            <img
              src="https://i.ibb.co/HTTXvH71/1775998701478.png"
              alt="PROTEGE Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-cover group-hover:scale-105 transition-transform"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="font-display text-2xl md:text-3xl text-primary-foreground tracking-wider group-hover:text-secondary transition-colors">
              PROTEGE
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm font-semibold text-primary-foreground/90 hover:text-secondary transition-colors relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-primary-foreground z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={cn(
            "fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="text-2xl font-display text-primary-foreground hover:text-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
