import React from "react";
import { motion } from "framer-motion";
import { Building2, Warehouse, Factory, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PROJECTS = [
  {
    icon: Building2,
    title: "Consultoria Industrial",
    desc: "Avaliação completa de riscos e implementação de sistema de segurança em grande indústria têxtil.",
    result: "Redução de 85% em acidentes",
  },
  {
    icon: Warehouse,
    title: "Programa Logística",
    desc: "Treinamento de 200 colaboradores e criação de procedimentos para operações de carga e descarga.",
    result: "100% de conformidade legal",
  },
  {
    icon: Factory,
    title: "Programa Alimentício",
    desc: "Implementação de procedimentos de higiene e segurança alimentar em processadora de alimentos.",
    result: "Certificação obtida",
  },
];

export function Projects() {
  return (
    <section id="projetos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase border border-secondary/30 mb-4">
            Nossos Projetos
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Projetos Já Desenvolvidos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Card className="h-full border-l-4 border-l-secondary rounded-none hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-xl">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-5">
                    <proj.icon size={22} className="text-secondary" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-3">
                    {proj.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {proj.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                    <CheckCircle size={16} />
                    {proj.result}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
