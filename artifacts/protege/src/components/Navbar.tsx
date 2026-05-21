import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#home", label: "HOME" },
  { href: "#quem-somos", label: "QUEM SOMOS" },
  { href: "#servicos", label: "SERVIÇOS" },
  { href: "#projetos", label: "TRABALHOS" },
  { href: "#por-que", label: "POR QUE NÓS?" },
  { href: "#temas", label: "RISCOS" },
  { href: "#cardapio", label: "CARDÁPIO" },
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
            className="flex items-center gap-3 group"
          >
            <img
              src="https://i.ibb.co/HTTXvH71/1775998701478.png"
              alt="PROTEGE Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-lg group-hover:scale-105 transition-transform"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="font-display text-2xl md:text-3xl text-primary-foreground tracking-wider group-hover:text-secondary transition-colors">
              PROTEGE
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-xs xl:text-sm font-semibold text-primary-foreground/90 hover:text-secondary transition-colors relative group py-2 whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            className="lg:hidden text-primary-foreground p-2 z-[70] relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile — fora da nav para evitar conflito de camadas */}
      <div
        className={cn(
          "fixed inset-0 bg-primary z-[60] flex flex-col items-center justify-center gap-8 transition-all duration-300 lg:hidden",
          mobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-full"
        )}
      >
        <button
          className="absolute top-4 right-4 text-primary-foreground p-2"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Fechar menu"
        >
          <X size={32} />
        </button>

        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className="text-3xl font-display text-primary-foreground hover:text-secondary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
