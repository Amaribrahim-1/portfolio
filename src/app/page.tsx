import { ScrollPath } from "@/components/motion/ScrollPath";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Cv } from "@/components/sections/Cv";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <div className="relative">
      <ScrollPath />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Cv />
      <Contact />
    </div>
  );
}
