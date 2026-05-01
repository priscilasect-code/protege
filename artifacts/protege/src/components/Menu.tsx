import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MessageCircle, Wrench, Sparkles, ChevronDown } from "lucide-react";

const MENU = [
  {
    icon: Building2,
    audience: "Pequenas Empresas",
    color: "bg-primary",
    textColor: "text-primary-foreground",
    accentColor: "text-secondary",
    borderColor: "border-secondary",
    topics: [
      "Integração de segurança para novos colaboradores",
      "Uso correto de EPI no dia a dia",
      "Prevenção de acidentes no ambiente de trabalho",
      "Primeiros socorros básicos",
      "Noções de ergonomia e postura",
      "Riscos elétricos e como evitá-los",
      "Organização e limpeza do espaço de trabalho (5S)",
      "Como agir em caso de emergência / incêndio",
      "Direitos e deveres do trabalhador em segurança",
      "Normas Regulamentadoras (NRs) essenciais",
    ],
  },
  {
    icon: MessageCircle,
    audience: "Grupos de Conversa",
    color: "bg-secondary",
    textColor: "text-secondary-foreground",
    accentColor: "text-secondary-foreground",
    borderColor: "border-secondary-foreground/30",
    topics: [
      "Dicas rápidas de prevenção no trabalho",
      "Curiosidades sobre acidentes evitáveis",
      "Checklist diário de segurança",
      "Como identificar riscos no seu ambiente",
      "Importância do uso de EPI",
      "Notícias e estatísticas de segurança do trabalho",
      "Campanhas de conscientização (SIPAT, etc.)",
      "Orientações sobre saúde mental no trabalho",
      "Exemplos de boas práticas em segurança",
      "Perguntas e respostas sobre segurança",
    ],
  },
  {
    icon: Wrench,
    audience: "Trabalhadores Autônomos",
    color: "bg-foreground",
    textColor: "text-background",
    accentColor: "text-secondary",
    borderColor: "border-secondary",
    topics: [
      "Segurança para trabalhos em altura",
      "Uso de ferramentas elétricas com segurança",
      "Proteção contra poeiras e produtos químicos",
      "EPI obrigatório por tipo de serviço",
      "Trabalho em espaços confinados",
      "Prevenção de cortes e perfurações",
      "Segurança em instalações elétricas",
      "Cuidados com sobrepeso e esforço físico",
      "Como ter laudo e documentação de segurança",
      "Responsabilidade civil do autônomo",
    ],
  },
  {
    icon: Sparkles,
    audience: "Faxineiras e Diaristas",
    color: "bg-primary/90",
    textColor: "text-primary-foreground",
    accentColor: "text-secondary",
    borderColor: "border-secondary",
    topics: [
      "Uso seguro de produtos de limpeza",
      "Como misturar (ou não misturar) produtos químicos",
      "Proteção das mãos: luvas e cuidados com a pele",
      "Prevenção de quedas em superfícies molhadas",
      "Postura correta ao varrer, esfregar e agachar",
      "Ventilação do ambiente ao usar produtos",
      "Riscos biológicos em banheiros e cozinhas",
      "Descarte correto de materiais contaminados",
      "Primeiros socorros em caso de intoxicação",
      "Direitos trabalhistas e saúde da diarista",
    ],
  },
];

export function Menu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="cardapio" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase border border-secondary/30 mb-4">
            Cardápio de Temas
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Assuntos que a PROTEGE<br />
            <span className="text-primary">Leva até Você</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Escolha o perfil que melhor representa o seu grupo ou empresa e veja os temas disponíveis para palestras, workshops e treinamentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {MENU.map((item, i) => {
            const Icon = item.icon;
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-none border-l-4 ${item.borderColor} shadow-md overflow-hidden`}
              >
                <button
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center justify-between gap-4 p-6 ${item.color} ${item.textColor} text-left transition-opacity hover:opacity-90`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className={item.textColor} />
                    </div>
                    <span className="font-display text-2xl tracking-wide">{item.audience}</span>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={22} className={item.textColor} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="bg-white border border-border/50 divide-y divide-border/30">
                        {item.topics.map((topic, j) => (
                          <li key={j} className="flex items-start gap-3 px-6 py-3 text-sm text-foreground">
                            <span className="text-primary font-bold mt-0.5 flex-shrink-0">{String(j + 1).padStart(2, "0")}.</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`${item.color} px-6 py-3`}>
                        <p className={`text-xs font-semibold ${item.accentColor} uppercase tracking-wider`}>
                          {item.topics.length} temas disponíveis · Solicite uma proposta
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
