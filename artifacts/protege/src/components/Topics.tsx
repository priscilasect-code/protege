import React from "react";
import { motion } from "framer-motion";
import { Volume2, FlaskConical, Biohazard, Activity, Zap, ShieldCheck, AlertTriangle } from "lucide-react";

const TOPICS = [
  {
    icon: Volume2,
    iconBg: "#27ae60",
    title: "Riscos Físicos",
    desc: "Ruído, vibrações, calor, frio e radiações que podem comprometer a saúde do trabalhador.",
    tagline: "Prevenir hoje é garantir o amanhã.",
  },
  {
    icon: FlaskConical,
    iconBg: "#e74c3c",
    title: "Riscos Químicos",
    desc: "Poeiras, fumos, gases, vapores e substâncias químicas. Misturar produtos pode causar intoxicação grave.",
    tagline: "O risco invisível também mata.",
  },
  {
    icon: Biohazard,
    iconBg: "#8b6f47",
    title: "Riscos Biológicos",
    desc: "Vírus, bactérias, fungos e parasitas. Comum em atividades com lixo, esgoto ou contato com pessoas e animais enfermos.",
    tagline: "A higiene é a sua primeira linha de defesa.",
  },
  {
    icon: Activity,
    iconBg: "#f1c40f",
    iconColor: "#333",
    title: "Riscos Ergonômicos",
    desc: "Postura inadequada, levantamento de peso e estresse. Impactos: dores, lesões e afastamentos do trabalho.",
    tagline: "Segurança começa com pequenas atitudes.",
  },
  {
    icon: Zap,
    iconBg: "#2980b9",
    title: "Riscos de Acidentes",
    desc: "Arranjo físico deficiente, máquinas sem proteção, eletricidade e quedas. Podem causar lesões imediatas.",
    tagline: "Atenção total evita o inesperado.",
  },
  {
    icon: ShieldCheck,
    iconBg: "#16a085",
    title: "Uso de EPI",
    desc: "Luvas, máscaras, óculos de proteção e calçados adequados. O uso correto do EPI salva vidas todos os dias.",
    tagline: "EPI: sua primeira linha de defesa.",
  },
];

export function Topics() {
  return (
    <section id="temas" className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase border border-secondary/30 mb-4">
            Riscos Ambientais
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary-foreground">
            Conheça os Principais Riscos Ambientais
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-primary-foreground/5 border border-primary-foreground/10 p-6 rounded-none hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: topic.iconBg }}
                  >
                    <Icon size={20} color={topic.iconColor || "#fff"} />
                  </div>
                  <h3 className="font-display text-xl text-primary-foreground tracking-wide">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-primary-foreground/75 mb-4">
                  {topic.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                  <AlertTriangle size={14} />
                  {topic.tagline}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
