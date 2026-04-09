import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, BarChart3, FileCheck } from "lucide-react";

const BENEFITS = [
  {
    icon: TrendingDown,
    title: "Redução de Acidentes",
    desc: "Menos afastamentos, menos custos com indenizações e maior bem-estar da equipe.",
  },
  {
    icon: BarChart3,
    title: "Mais Produtividade",
    desc: "Ambiente seguro gera equipes mais confiantes, motivadas e eficientes.",
  },
  {
    icon: FileCheck,
    title: "Cumprimento da Lei",
    desc: "Evite multas, interdições e penalidades com total conformidade legal.",
  },
];

export function Benefits() {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-secondary-foreground">
            Por que Investir em Segurança?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-secondary-foreground/10 p-8 text-center"
              >
                <Icon size={40} className="mx-auto mb-4 text-secondary-foreground" />
                <h3 className="font-display text-xl text-secondary-foreground mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
