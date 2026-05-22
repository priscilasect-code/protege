import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("https://formspree.io/f/mvzlrran", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-border bg-white text-foreground text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-primary transition-shadow";

  return (
    <section id="contato" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary font-bold text-xs tracking-widest uppercase border border-secondary/30 mb-4">
              Contato
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-none">
              Vamos Conversar<br />
              <span className="text-primary">Sobre Segurança?</span>
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Entre em contato conosco e descubra como podemos transformar a cultura de segurança da sua empresa.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: "(27) 99999-9999" },
                { icon: Mail, label: "protegeconsultoria@proton.me" },
                { icon: MapPin, label: "João Neiva, ES" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-foreground flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-secondary" />
                  </div>
                  <span className="text-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <a
                href="https://www.instagram.com/protegeconsultoria/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram size={18} className="text-secondary" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-10 text-center shadow-xl h-full flex flex-col items-center justify-center">
                <p className="font-display text-3xl mb-3">Mensagem Enviada!</p>
                <p className="text-sm">Obrigado pelo contato. Entraremos em breve.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-xs underline text-green-700"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white shadow-xl p-8 space-y-5 border border-border/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Nome</label>
                    <input type="text" name="Nome" required placeholder="Seu nome completo" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Empresa</label>
                    <input type="text" name="Empresa" placeholder="Nome da empresa" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">E-mail</label>
                    <input type="email" name="email" required placeholder="seu@email.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Telefone</label>
                    <input type="tel" name="Telefone" placeholder="(00) 00000-0000" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Serviço Desejado</label>
                  <select name="Servico" className={inputClass}>
                    <option value="">Selecione um serviço</option>
                    <option value="palestra">Palestras Educativas</option>
                    <option value="workshop">Workshops Práticos</option>
                    <option value="avaliacao">Avaliação de Riscos</option>
                    <option value="treinamento">Treinamentos de EPI</option>
                    <option value="cartilha">Cartilhas Educativas</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Mensagem</label>
                  <textarea name="Mensagem" rows={4} placeholder="Descreva sua necessidade..." className={`${inputClass} resize-none`} />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-secondary text-secondary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:bg-secondary/90 hover:scale-[1.02] transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                >
                  <Send size={18} />
                  {status === "sending" ? "Enviando..." : "Enviar Mensagem"}
                </button>
                {status === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-semibold text-center">
                    Erro ao enviar. Verifique sua conexão e tente novamente.
                  </div>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
