import React from "react";
import { Shield, Heart, CheckCircle } from "lucide-react";

export function Values() {
  return (
    <section className="bg-background py-12 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border/50">
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Shield size={32} />
            </div>
            <h3 className="font-display text-2xl text-foreground mb-2">PREVENÇÃO</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Antecipamos os riscos para que acidentes nunca cheguem a acontecer.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 pt-8 md:pt-4">
            <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4 text-amber-600">
              <Heart size={32} />
            </div>
            <h3 className="font-display text-2xl text-foreground mb-2">CUIDADO COM A VIDA</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Cada trabalhador importa. Nosso foco é garantir que todos voltem para casa em segurança.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 pt-8 md:pt-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-display text-2xl text-foreground mb-2">RESPONSABILIDADE</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Compromisso inabalável com a legislação e com as melhores práticas de segurança.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
