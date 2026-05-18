import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const TABS = [
  {
    label: "Indústria Têxtil",
    company: "Empresa A — João Neiva, ES",
    items: [
      {
        img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        title: "Treinamento de EPI",
        subtitle: "Capacitação completa da equipe de produção sobre uso correto de equipamentos.",
        result: "Redução de 85% em acidentes",
      },
      {
        img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
        title: "Avaliação de Riscos",
        subtitle: "Mapeamento de todos os pontos críticos do chão de fábrica.",
        result: "100% das NRs atendidas",
      },
      {
        img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80",
        title: "Palestra de Prevenção",
        subtitle: "Conscientização sobre riscos físicos e químicos no ambiente industrial.",
        result: "200 colaboradores treinados",
      },
    ],
  },
  {
    label: "Logística",
    company: "Empresa B — Aracruz, ES",
    items: [
      {
        img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
        title: "Segurança em Carga e Descarga",
        subtitle: "Treinamento prático para operadores de empilhadeira e carregadores.",
        result: "0 acidentes no trimestre",
      },
      {
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
        title: "Sinalização de Segurança",
        subtitle: "Instalação e orientação sobre sinalizações obrigatórias no depósito.",
        result: "Conformidade legal obtida",
      },
    ],
  },
  {
    label: "Alimentício",
    company: "Empresa C — Ibiraçu, ES",
    items: [
      {
        img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
        title: "Higiene e Segurança Alimentar",
        subtitle: "Implementação de procedimentos de higiene para manipuladores de alimentos.",
        result: "Certificação obtida",
      },
      {
        img: "https://images.unsplash.com/photo-1565117131175-3a6e4fc8b1a1?w=600&q=80",
        title: "Workshop de Boas Práticas",
        subtitle: "Treinamento dinâmico sobre contaminação cruzada e armazenamento seguro.",
        result: "100% da equipe certificada",
      },
    ],
  },
];

export function Projects() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="projetos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase border border-secondary/30 mb-4">
            Portfólio
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Trabalhos Já Desenvolvidos
          </h2>
        </div>

        {/* Abas */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 font-semibold text-sm transition-all duration-200 border-b-4 ${
                activeTab === i
                  ? "bg-primary text-primary-foreground border-secondary"
                  : "bg-background text-foreground border-transparent hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empresa */}
        <p className="text-center text-sm text-muted-foreground mb-8 font-medium">
          {TABS[activeTab].company}
        </p>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {TABS[activeTab].items.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-border shadow-md hover:-translate-y-2 transition-transform duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.subtitle}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <CheckCircle size={16} />
                    {item.result}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
