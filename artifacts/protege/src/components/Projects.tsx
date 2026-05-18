import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight, Users } from "lucide-react";

const CAROUSEL_IMAGES = [
  "/granitos-litoral-dds.png",
  "/granitos-litoral-01.jpg",
  "/granitos-litoral-04.jpg",
  "/granitos-litoral-03.jpg",
  "/granitos-litoral-05.jpg",
  "/granitos-litoral-02.jpg",
  "/granitos-litoral-06.jpg",
];

function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  return (
    <div className="relative overflow-hidden bg-neutral-100" style={{ height: 520 }}>
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
          className="absolute inset-0 w-full h-full object-contain"
        />
      </AnimatePresence>

      <button
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2.5 rounded-full shadow transition-all z-10"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2.5 rounded-full shadow transition-all z-10"
        aria-label="Próxima"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-secondary w-6" : "bg-white/70 w-1.5"}`}
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
    carousel: true,
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

        {/* Abas */}
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

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <CheckCircle size={16} />
                  {tab.result}
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Users size={16} className="mt-0.5 shrink-0 text-secondary" />
                  <span><strong className="text-foreground">Palestrantes:</strong> {tab.speakers}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
