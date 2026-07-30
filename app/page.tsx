import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Sectors from "@/components/sections/Sectors";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Sectors />
      <About />
    </>
  );
}