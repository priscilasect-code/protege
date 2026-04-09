import React from "react";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="quem-somos" className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
      <div className="absolute -right-64 -top-64 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl md:text-6xl mb-6 leading-none">
              LEVAMOS CONHECIMENTO DE <span className="text-secondary">SEGURANÇA PARA TODOS.</span>
            </h2>
            <div className="space-y-6 text-lg text-primary-foreground/80">
              <p>
                A PROTEGE nasceu em Ibiraçu, ES, com uma missão clara: democratizar o acesso à segurança do trabalho. Acreditamos que conhecimento salva vidas, e toda empresa, não importa o tamanho, merece um ambiente seguro para sua equipe.
              </p>
              <p>
                Nosso diferencial é a abordagem prática. Não fazemos apenas apresentações teóricas; criamos simulações dinâmicas, interativas e reais. Mostramos na prática como usar equipamentos, como evitar riscos e, acima de tudo, por que a vida é nosso maior patrimônio.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {[
              { num: "500+", label: "Treinamentos Realizados" },
              { num: "98%", label: "Índice de Satisfação" },
              { num: "50+", label: "Empresas Atendidas" },
              { num: "0", label: "Meta de Acidentes" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-primary-foreground/5 border border-primary-foreground/10 p-6 md:p-8 flex flex-col justify-center items-center text-center backdrop-blur-sm"
              >
                <div className="font-display text-5xl md:text-6xl text-secondary mb-2">{stat.num}</div>
                <div className="font-semibold text-sm md:text-base uppercase tracking-wider text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
