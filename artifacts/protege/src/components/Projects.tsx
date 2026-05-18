import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users } from "lucide-react";

const CAROUSEL_IMAGES = [
  "/granitos-litoral-dds.png",
  "/granitos-litoral-01.jpg",
  "/granitos-litoral-04.jpg",
  "/granitos-litoral-03.jpg",
  "/granitos-litoral-05.jpg",
  "/granitos-litoral-02.jpg",
  "/granitos-litoral-06.jpg",
];

const COLORS = {
  otimo: "hsl(145, 75%, 21%)",
  bom: "hsl(45, 95%, 50%)",
  ruim: "#d1d5db",
};

type DonutData = { otimo: number; bom: number; ruim: number };

function DonutChart({ data, label }: { data: DonutData; label: string }) {
  const total = data.otimo + data.bom + data.ruim;
  const r = 38;
  const cx = 50;
  const cy = 50;
  const circ = 2 * Math.PI * r;

  const segments = [
    { value: data.otimo, color: COLORS.otimo, key: "Ótimo" },
    { value: data.bom, color: COLORS.bom, key: "Bom" },
    { value: data.ruim, color: COLORS.ruim, key: "Ruim" },
  ];

  let offset = 0;
  const arcs = segments.map((seg) => {
    const pct = seg.value / total;
    const dash = pct * circ;
    const arc = { ...seg, dash, offset, pct: Math.round(pct * 100) };
    offset += dash;
    return arc;
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 100" width={100} height={100}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth={12} />
        {arcs.map((arc) =>
          arc.value > 0 ? (
            <circle
              key={arc.key}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={arc.color}
              strokeWidth={12}
              strokeDasharray={`${arc.dash} ${circ - arc.dash}`}
              strokeDashoffset={-(arc.offset - circ / 4)}
              strokeLinecap="butt"
            />
          ) : null
        )}
      </svg>

      <p className="text-[10px] text-center text-muted-foreground font-semibold leading-snug max-w-[130px]">
        {label}
      </p>

      <div className="flex flex-col gap-0.5 text-[10px] w-full">
        {arcs.map((s) => (
          <span key={s.key} className="flex items-center justify-between gap-1 text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ background: s.color }} />
              {s.key}
            </span>
            <span className="font-semibold" style={{ color: s.color }}>{s.pct}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const DDS_CHARTS: { data: DonutData; label: string }[] = [
  { data: { otimo: 7, bom: 7, ruim: 5 }, label: "1. Identificação de riscos invisíveis" },
  { data: { otimo: 9, bom: 9, ruim: 1 }, label: "2. Clareza da linguagem e exemplos" },
  { data: { otimo: 12, bom: 7, ruim: 0 }, label: "3. Importância do uso de EPIs" },
  { data: { otimo: 5, bom: 13, ruim: 1 }, label: "4. Organização e duração do DDS" },
  { data: { otimo: 7, bom: 11, ruim: 1 }, label: "5. Higiene e organização do ambiente" },
];

function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = React.useRef<number | null>(null);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div>
      <div
        className="relative overflow-hidden bg-neutral-100"
        style={{ height: 520 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={current}
            src={CAROUSEL_IMAGES[current]}
            alt={`Foto ${current + 1}`}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-contain select-none"
            draggable={false}
          />
        </AnimatePresence>

      </div>

      {/* Indicadores abaixo da imagem */}
      <div className="flex justify-center items-center gap-1.5 py-3 bg-white">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-primary w-4 h-1.5"
                : "bg-border w-1.5 h-1.5 hover:bg-primary/40"
            }`}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const TABS = [
  {
    label: "Granitos Litoral",
    company: "Granitos Litoral LTDA — Ibiraçu, ES",
    title: "Percepção de Riscos",
    subtitle: "Palestra sobre riscos invisíveis na indústria de rochas ornamentais, com destaque para os riscos químicos das resinas epóxi e a importância do uso de EPI.",
    result: "Equipe capacitada com sucesso",
    speakers: "Priscila, Carolina, Brenda, Izabela e Izadora",
  },
];

export function Projects() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

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

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TABS.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 font-semibold text-sm transition-all duration-200 border-b-4 ${
                activeTab === i
                  ? "bg-primary text-primary-foreground border-secondary"
                  : "bg-background text-foreground border-transparent hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-8 font-medium">
          {tab.company}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto bg-white overflow-hidden"
          >
            <ImageCarousel />

            <div className="p-8">
              <h3 className="font-display text-3xl text-foreground mb-3">{tab.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{tab.subtitle}</p>

              <div className="flex flex-col gap-3 mb-10">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <CheckCircle size={16} />
                  {tab.result}
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Users size={16} className="mt-0.5 shrink-0 text-secondary" />
                  <span><strong className="text-foreground">Palestrantes:</strong> {tab.speakers}</span>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase border border-secondary/30 mb-2">
                  Avaliação do DDS
                </span>
                <p className="text-xs text-muted-foreground mb-6">
                  Avaliação aplicada com <strong className="text-foreground">19 dos 20 participantes presentes</strong>, de um grupo-alvo de 30 colaboradores.
                </p>

                <div className="bg-primary/5 border border-primary/20 p-4 mb-8 flex items-center gap-3">
                  <CheckCircle size={22} className="text-primary shrink-0" />
                  <p className="text-sm font-semibold text-primary">
                    100% dos colaboradores compreenderam a importância do uso imediato de EPIs para prevenir doenças como a silicose.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
                  {DDS_CHARTS.map((chart, i) => (
                    <DonutChart key={i} data={chart.data} label={chart.label} />
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-8 italic">
                  A maioria aprovou a didática, organização e importância dos EPIs. 26,3% ainda sentem dificuldade em identificar riscos invisíveis, indicando oportunidade de reforço nessa área.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
