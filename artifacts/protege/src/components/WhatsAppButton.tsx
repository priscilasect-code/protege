import React from "react";
import { motion } from "framer-motion";

const PHONE = "5527999999999";
const MESSAGE = encodeURIComponent("Olá! Vim pelo site da PROTEGE e gostaria de saber mais sobre os serviços.");

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white shadow-lg rounded-full px-4 py-3 font-semibold text-sm hover:bg-[#20ba5a] transition-colors"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 32 32" width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.77L0 32l8.437-2.01A15.934 15.934 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.854l-.485-.288-5.01 1.194 1.238-4.877-.316-.5A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.87c-.398-.2-2.355-1.163-2.72-1.295-.366-.133-.633-.2-.9.2-.266.398-1.031 1.295-1.265 1.562-.233.266-.466.3-.864.1-.398-.2-1.681-.619-3.201-1.975-1.183-1.056-1.981-2.36-2.214-2.758-.233-.398-.025-.613.175-.812.18-.178.398-.466.598-.698.2-.233.266-.398.398-.665.133-.266.067-.499-.033-.698-.1-.2-.9-2.164-1.232-2.963-.325-.778-.656-.672-.9-.685-.233-.012-.499-.015-.765-.015s-.698.1-.1064.499c-.366.398-1.398 1.363-1.398 3.326s1.431 3.858 1.63 4.124c.2.266 2.816 4.3 6.822 6.03.953.412 1.697.658 2.277.842.957.305 1.828.262 2.516.159.767-.115 2.355-.963 2.688-1.893.333-.93.333-1.728.233-1.893-.1-.166-.366-.266-.765-.466z"/>
      </svg>
      WhatsApp
    </motion.a>
  );
}
