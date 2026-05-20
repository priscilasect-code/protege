import React from "react";
import { motion } from "framer-motion";
import { Mic, Wrench, Search, HardHat, BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SERVICES = [
  {
    icon: Mic,
    title: "Palestras Educativas",
    desc: "Apresentações dinâmicas e engajadoras para conscientizar sua equipe sobre a importância da prevenção."
  },
  {
    icon: Wrench,
    title: "Workshops Práticos",
    desc: "Treinamentos imersivos onde os colaboradores aprendem fazendo, simulando situações reais."
  },
  {
    icon: Search,
    title: "Avaliação de Riscos",
    desc: "Mapeamento minucioso do ambiente de trabalho para identificar e mitigar perigos potenciais."
  },
  {
    icon: HardHat,
    title: "Treinamentos de EPI",
    desc: "Instrução completa sobre seleção, uso correto, guarda e conservação de Equipamentos de Proteção Individual."
  },
  {
    icon: BookOpen,
    title: "Cartilhas Educativas",
    desc: "Desenvolvimento de material didático personalizado para reforço contínuo das normas de segurança."
  }
];

export function Services() {
  const scrollToContact = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">NOSSOS SERVIÇOS</h2>
          <p className="text-muted-foreground text-lg">
            Soluções completas e práticas para garantir um ambiente de trabalho mais seguro, produtivo e dentro da lei.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full border-l-4 border-l-secondary rounded-none hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-xl">
                <CardContent className="p-8">
                  <srv.icon size={40} className="text-primary mb-6" />
                  <h3 className="font-display text-2xl text-foreground mb-3">{srv.title}</h3>
                  <p className="text-muted-foreground">{srv.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 5 * 0.1 }}
          >
            <Card 
              className="h-full bg-primary text-primary-foreground border-none rounded-none hover:-translate-y-2 transition-transform duration-300 shadow-md cursor-pointer group"
              onClick={scrollToContact}
            >
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-display text-3xl mb-3 group-hover:text-secondary transition-colors">PRECISA DE ALGO ESPECÍFICO?</h3>
                  <p className="text-primary-foreground/80 mb-6">
                    Adaptamos nossos treinamentos e consultorias para a realidade exata da sua operação.
                  </p>
                </div>
                <div className="flex items-center text-secondary font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  Fale conosco <ArrowRight className="ml-2" size={20} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
