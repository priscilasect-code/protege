import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToContact = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-pattern-diagonal opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-6">
            <img
              src="https://i.ibb.co/HTTXvH71/1775998701478.png"
              alt="PROTEGE Logo"
              className="h-28 w-28 md:h-36 md:w-36 object-contain rounded-2xl shadow-2xl ring-4 ring-secondary/50"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-sm tracking-widest mb-6 uppercase border border-secondary/30">
            Consultoria em Segurança do Trabalho
          </span>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.9] mb-8">
            SEGURANÇA NÃO É GASTO,<br />
            <span className="text-secondary">É INVESTIMENTO EM VIDA.</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Levamos conhecimento prático e real para sua empresa. Protege quem constrói o seu negócio todos os dias com treinamentos interativos e foco humano.
          </p>
          
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg h-14 px-8 rounded-none border-b-4 border-r-4 border-amber-600 transition-transform active:translate-y-1 active:border-b-0 active:border-r-0 hover:-translate-y-1"
          >
            Solicite uma Avaliação Gratuita
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
