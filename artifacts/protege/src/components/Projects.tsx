import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users, Star } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const COLORS = {
  otimo: "hsl(145, 75%, 21%)",
  bom: "hsl(45, 95%, 50%)",
  ruim: "#d1d5db",
};

type DonutData = { otimo: number; bom: number; ruim: number };

function DonutChart({ data, label }: { data: DonutData; label: string }) {
  const total = data.otimo + data.bom + data.ruim;
  const r = 42;
  const cx = 60;
  const cy = 60;
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
    const arc = { ...seg, dash, offset, pct };
    offset += dash;
    return arc;
  });

  const topLabel = [...segments].sort((a, b) => b.value - a.value)[0];
  const topPct = Math.round((topLabel.value / total) * 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 120 120" width={140} height={140}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth={14} />
        {arcs.map((arc) =>
          arc.value > 0 ? (
            <circle
              key={arc.key}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={arc.color}
              strokeWidth={14}
              strokeDasharray={`${arc.dash} ${circ - arc.dash}`}
              strokeDashoffset={-(arc.offset - circ / 4)}
              strokeLinecap="butt"
            />
          ) : null
        )}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="bold" fill={topLabel.color}>
          {topPct}%
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#6b7280">
          {topLabel.key}
        </text>
      </svg>

      <p className="text-xs text-center text-muted-foreground font-medium leading-snug max-w-[160px]">
        {label}
      </p>

      <div className="flex gap-3 text-xs">
        {[
          { label: "Ótimo", value: data.otimo, color: COLORS.otimo },
          { label: "Bom", value: data.bom, color: COLORS.bom },
          { label: "Ruim", value: data.ruim, color: COLORS.ruim },
        ].map((s) => (
          <span key={s.label} className="flex items-center gap-1 text-muted-foreground">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: s.color }} />
            {s.label} ({s.value}) {Math.round((s.value / total) * 100)}%
          </span>
        ))}
      </div>
    </div>
  );
}

function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = React.useRef<number | null>(null);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + images.length) % images.length);
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
            src={images[current]}
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

      <div className="flex justify-center items-center gap-1.5 py-3 bg-white">
        {images.map((_, i) => (
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

const GRANITOS_IMAGES = [
  `${BASE}granitos-litoral-dds.png`,
  `${BASE}granitos-litoral-01.jpg`,
  `${BASE}granitos-litoral-04.jpg`,
  `${BASE}granitos-litoral-03.jpg`,
  `${BASE}granitos-litoral-05.jpg`,
  `${BASE}granitos-litoral-02.jpg`,
  `${BASE}granitos-litoral-06.jpg`,
];

const MULHERES_IMAGES = [
  `${BASE}mulheres-flyer.jpg`,
  `${BASE}mulheres-01.jpg`,
  `${BASE}mulheres-02.jpg`,
  `${BASE}mulheres-03.jpg`,
  `${BASE}mulheres-04.jpg`,
  `${BASE}mulheres-05.jpg`,
];

const CTJON_IMAGES = [
  `${BASE}ctjon-flyer.png`,
  `${BASE}ctjon-01.jpg`,
  `${BASE}ctjon-02.jpg`,
  `${BASE}ctjon-03.jpg`,
  `${BASE}ctjon-04.jpg`,
  `${BASE}ctjon-05.jpg`,
  `${BASE}ctjon-06.jpg`,
];

const DDS_CHARTS_GRANITOS: { data: DonutData; label: string }[] = [
  { data: { otimo: 7, bom: 7, ruim: 5 }, label: "1. Identificação de riscos invisíveis" },
  { data: { otimo: 9, bom: 9, ruim: 1 }, label: "2. Clareza da linguagem e exemplos" },
  { data: { otimo: 12, bom: 7, ruim: 0 }, label: "3. Importância do uso de EPIs" },
  { data: { otimo: 5, bom: 13, ruim: 1 }, label: "4. Organização e duração do DDS" },
  { data: { otimo: 7, bom: 11, ruim: 1 }, label: "5. Higiene e organização do ambiente" },
];

const TABS = [
  {
    label: "Granitos Litoral",
    company: "Granitos Litoral LTDA — Ibiraçu, ES",
    title: "Percepção de Riscos",
    subtitle:
      "Palestra sobre riscos invisíveis na indústria de rochas ornamentais, com destaque para os riscos químicos das resinas epóxi e a importância do uso de EPI.",
    result: "Equipe capacitada com sucesso",
    speakers: "Priscila, Carolina, Brenda, Izabela e Izadora",
    images: GRANITOS_IMAGES,
    evaluation: "granitos" as const,
  },
  {
    label: "Assoc. de Mulheres",
    company: "Associação de Mulheres — João Neiva, ES",
    title: "Mulheres em Movimento: Vozes que Libertam",
    subtitle:
      "Os assuntos abordados incluíram temas relevantes como assédio moral e sexual, machismo estrutural, violência de gênero, autocuidado, valorização pessoal e redes de apoio entre mulheres. O encontro também promoveu reflexões sobre superação de desafios, apoio emocional e a importância da participação social, fortalecendo a união e o empoderamento feminino.",
    result: "Empoderamento e fortalecimento coletivo alcançados",
    speakers: "Djuliane, Luma, Hiago, Caio e Adrian",
    images: MULHERES_IMAGES,
    evaluation: "mulheres" as const,
  },
  {
    label: "CTJON",
    company: "CTJON – Centro de Triagem de Materiais Recicláveis — João Neiva, ES",
    title: "Reciclagem e Segurança",
    subtitle:
      "Foram abordados temas como o uso correto de EPIs no manuseio de materiais recicláveis, cuidados no contato com resíduos e os riscos de doenças causadas por materiais contaminados, reforçando a importância da prevenção e da segurança no ambiente de trabalho.",
    result: "Maior conscientização e adoção de práticas mais seguras no trabalho",
    speakers: "Thais, Edla, Leide, Joevelym e Débora",
    images: CTJON_IMAGES,
    evaluation: "ctjon" as const,
  },
];

function GranitosEvaluation() {
  return (
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
        {DDS_CHARTS_GRANITOS.map((chart, i) => (
          <DonutChart key={i} data={chart.data} label={chart.label} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-8 italic">
        A maioria aprovou a didática, organização e importância dos EPIs. 26,3% ainda sentem dificuldade em identificar riscos invisíveis, indicando oportunidade de reforço nessa área.
      </p>
    </div>
  );
}

function CtjonEvaluation() {
  return (
    <div className="border-t border-border pt-8">
      <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase border border-secondary/30 mb-2">
        Avaliação do DDS
      </span>
      <p className="text-xs text-muted-foreground mb-6">
        Avaliação coletada ao final do DDS com os colaboradores do CTJON presentes.
      </p>

      <div className="bg-primary/5 border border-primary/20 p-4 mb-8 flex items-center gap-3">
        <CheckCircle size={22} className="text-primary shrink-0" />
        <p className="text-sm font-semibold text-primary">
          Alta aprovação — clareza das orientações e relevância dos temas foram os pontos mais destacados.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: "🪖",
            title: "Uso correto de EPIs",
            desc: "Os participantes passaram a compreender melhor a necessidade do uso de EPIs no manuseio diário de materiais recicláveis.",
          },
          {
            icon: "⚠️",
            title: "Consciência dos riscos",
            desc: "Aumento da atenção aos riscos de contaminação por materiais e resíduos, com foco em prevenção de doenças.",
          },
          {
            icon: "📋",
            title: "Normas de segurança",
            desc: "Maior engajamento com as normas de segurança do trabalho e incentivo à adoção de práticas mais seguras no cotidiano.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-muted/40 border border-border p-4 rounded-sm">
            <div className="text-2xl mb-2">{item.icon}</div>
            <h4 className="font-semibold text-sm text-foreground mb-1">{item.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">O que os participantes disseram</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              quote: "Aprendi coisas que uso todo dia aqui no trabalho e nunca tinha parado pra pensar. Importante demais.",
              name: "Colaborador",
              tag: "CTJON, João Neiva, ES",
            },
            {
              quote: "A gente mexe com material reciclável todo dia e não sabia dos riscos que corria. Agora sei como me proteger.",
              name: "Colaborador",
              tag: "CTJON, João Neiva, ES",
            },
            {
              quote: "Foi bem explicado, deu pra entender fácil. A equipe trouxe exemplos do nosso dia a dia mesmo.",
              name: "Colaborador",
              tag: "CTJON, João Neiva, ES",
            },
            {
              quote: "Muito bom! Espero que venham mais vezes. Segurança no trabalho é coisa séria e a gente precisa saber.",
              name: "Colaborador",
              tag: "CTJON, João Neiva, ES",
            },
          ].map((t, i) => (
            <div key={i} className="bg-muted/30 border border-border p-4 rounded-sm relative">
              <span className="text-4xl text-secondary/40 font-serif leading-none absolute top-2 left-3">"</span>
              <p className="text-sm text-foreground italic leading-relaxed pl-5 pt-2">{t.quote}</p>
              <div className="mt-3 pl-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {String.fromCharCode(65 + i)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground italic mt-6">
        A atividade foi considerada produtiva e essencial para o dia a dia dos trabalhadores do centro de triagem.
      </p>
    </div>
  );
}

function MulheresEvaluation() {
  return (
    <div className="border-t border-border pt-8">
      <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase border border-secondary/30 mb-2">
        Avaliação do Encontro
      </span>
      <p className="text-xs text-muted-foreground mb-6">
        Avaliação coletada ao final do 2º Encontro Mulheres em Movimento com as participantes presentes.
      </p>

      <div className="bg-primary/5 border border-primary/20 p-4 mb-8 flex items-center gap-3">
        <Star size={22} className="text-secondary shrink-0" fill="currentColor" />
        <p className="text-sm font-semibold text-primary">
          98,75% de aprovação — o encontro superou as expectativas das participantes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: "💬",
            title: "Espaço de escuta",
            desc: "As participantes destacaram a importância do espaço de escuta, troca de experiências e fortalecimento coletivo.",
          },
          {
            icon: "🤝",
            title: "Acolhimento",
            desc: "O acolhimento e a relevância dos temas abordados foram amplamente reconhecidos pelas mulheres presentes.",
          },
          {
            icon: "🌱",
            title: "Crescimento coletivo",
            desc: "A iniciativa foi vista como inspiradora e necessária, promovendo apoio mútuo e incentivo ao crescimento pessoal e social.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-muted/40 border border-border p-4 rounded-sm">
            <div className="text-2xl mb-2">{item.icon}</div>
            <h4 className="font-semibold text-sm text-foreground mb-1">{item.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">O que as participantes disseram</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              quote: "Foi um espaço que precisava existir há muito tempo. Me senti acolhida e fortalecida. Saí daqui diferente.",
              name: "Participante",
              tag: "João Neiva, ES",
            },
            {
              quote: "Nunca tinha parado pra pensar em tantas coisas ao mesmo tempo. O assédio, o autocuidado, a nossa rede. Muito importante.",
              name: "Participante",
              tag: "João Neiva, ES",
            },
            {
              quote: "A forma como os jovens conduziram foi incrível. Com respeito, com escuta. Me senti vista.",
              name: "Participante",
              tag: "João Neiva, ES",
            },
            {
              quote: "Quero que tenha mais encontros assim. A gente precisa desse espaço pra se unir e crescer juntas.",
              name: "Participante",
              tag: "João Neiva, ES",
            },
          ].map((t, i) => (
            <div key={i} className="bg-muted/30 border border-border p-4 rounded-sm relative">
              <span className="text-4xl text-secondary/40 font-serif leading-none absolute top-2 left-3">"</span>
              <p className="text-sm text-foreground italic leading-relaxed pl-5 pt-2">{t.quote}</p>
              <div className="mt-3 pl-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {String.fromCharCode(65 + i)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground italic mt-6">
        O evento foi muito bem recebido, deixando um sentimento de satisfação e o desejo de continuidade para os próximos encontros.
      </p>
    </div>
  );
}

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
            <ImageCarousel images={tab.images} />

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

              {tab.evaluation === "granitos" ? (
                <GranitosEvaluation />
              ) : tab.evaluation === "ctjon" ? (
                <CtjonEvaluation />
              ) : (
                <MulheresEvaluation />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
