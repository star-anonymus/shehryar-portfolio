import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Aurora from "@/components/ui/Aurora";
import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main>
        <Hero />

        {/* Everything below the hero shares one ambient background layer. */}
        <div className="relative">
          <Aurora />
          <div className="relative z-10">
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
