import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Building2, Award, TrendingUp, Clock, CheckCircle, Star } from "lucide-react";

function useCountUp(target: number, duration: number = 1600, active: boolean = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, active]);

  return value;
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  active,
  delay = 0,
}: {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  active: boolean;
  delay?: number;
}) {
  const count = useCountUp(value, 1600, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-2 p-5 sm:p-8 bg-white/5 border border-white/10"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
        <Icon size={22} className="text-secondary" />
      </div>
      <div className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight leading-none mt-1">
        {count}{suffix}
      </div>
      <p className="text-xs sm:text-sm text-white/60 text-center font-medium uppercase tracking-widest leading-snug max-w-[120px]">
        {label}
      </p>
    </motion.div>
  );
}

const STATS = [
  { icon: Building2, value: 5,   suffix: "+",  label: "Empresas Atendidas" },
  { icon: Users,     value: 80,  suffix: "+",  label: "Colaboradores Impactados" },
  { icon: Award,     value: 100, suffix: "%",  label: "Aprovação nos DDS" },
  { icon: TrendingUp,value: 2,   suffix: "+",  label: "Cidades no ES" },
];

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Expertise Técnica Real",
    desc: "Consultores formados e em formação com base acadêmica sólida, trazendo conhecimento atualizado das normas regulamentadoras diretamente para o chão de fábrica.",
  },
  {
    icon: Users,
    title: "Foco nas Pessoas",
    desc: "Nossa abordagem é humana e prática. Usamos linguagem acessível, dinâmicas interativas e exemplos reais do cotidiano de cada setor para garantir engajamento real.",
  },
  {
    icon: Clock,
    title: "Adaptável a Qualquer Segmento",
    desc: "Já atuamos em indústria de rochas, cerâmica, agropet, reciclagem e associações. Personalizamos cada DDS e treinamento conforme os riscos específicos da sua empresa.",
  },
  {
    icon: CheckCircle,
    title: "Resultados Comprovados",
    desc: "100% de aprovação nos encontros realizados. Feedback positivo dos colaboradores em todas as empresas atendidas, com melhoria real nas práticas de segurança.",
  },
  {
    icon: Star,
    title: "Metodologia Inovadora",
    desc: "Combinamos dados reais, manchetes jornalísticas, dinâmicas práticas e materiais visuais para transformar a segurança do trabalho em um tema envolvente e memorável.",
  },
  {
    icon: Award,
    title: "Prevenção que Economiza",
    desc: "Cada acidente de trabalho custa muito mais do que uma consultoria. Investir em segurança reduz afastamentos, multas e processos — e protege o que mais importa: as pessoas.",
  },
];

export function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0, rootMargin: "0px 0px -30px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="por-que" ref={sectionRef} className="bg-primary py-16 md:py-28">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase border border-secondary/30 mb-4"
          >
            Por que a PROTEGE?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4"
          >
            Nosso Impacto em Números
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed"
          >
            Resultados reais em empresas reais. Cada número representa uma pessoa mais protegida e um ambiente de trabalho mais seguro.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-20 md:mb-24">
          {STATS.map((s, i) => (
            <StatCard key={i} {...s} active={active} delay={i * 0.1} />
          ))}
        </div>

        <div className="text-center mb-10 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4"
          >
            Razões para Nos Contratar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed"
          >
            Segurança do trabalho não é burocracia — é estratégia. Veja o que nos diferencia.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {REASONS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white/5 border border-white/10 p-5 md:p-6 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30 mb-4 group-hover:bg-secondary/30 transition-colors">
                <r.icon size={20} className="text-secondary" />
              </div>
              <h3 className="font-display text-base md:text-lg text-white mb-2">{r.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 md:mt-16 text-center"
        >
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-block bg-secondary text-primary font-bold px-8 md:px-10 py-4 text-sm uppercase tracking-widest hover:bg-secondary/90 transition-colors"
          >
            Solicite uma Avaliação Gratuita
          </a>
        </motion.div>

      </div>
    </section>
  );
}
