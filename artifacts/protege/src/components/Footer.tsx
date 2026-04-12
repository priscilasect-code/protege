import React from "react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a1a1a" }}>
      <div className="caution-stripe h-[6px] w-full" />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/HTTXvH71/1775998701478.png"
              alt="PROTEGE Logo"
              className="h-8 w-8 object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="font-display text-xl tracking-wider" style={{ color: "#f5f0eb" }}>
              PROTEGE
            </span>
          </div>
          <p className="text-sm italic text-center" style={{ color: "#d4ccc3" }}>
            "Prevenção hoje é garantir o amanhã."
          </p>
          <p className="text-xs" style={{ color: "#5a534a" }}>
            © 2025 PROTEGE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
