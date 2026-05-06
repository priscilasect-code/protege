import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Values } from "@/components/Values";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Topics } from "@/components/Topics";
import { Menu } from "@/components/Menu";
import { Benefits } from "@/components/Benefits";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Values />
        <About />
        <Services />
        <Projects />
        <Topics />
        <Menu />
        <Benefits />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
