import { Header } from "@/components/public/header";
import { Hero } from "@/components/public/hero";
import { AboutSection } from "@/components/public/about-section";
import { ProjectsGrid } from "@/components/public/projects-grid";
import { ContactSection } from "@/components/public/contact-section";
import { Footer } from "@/components/public/footer";
import { Archivo, Instrument_Serif } from "next/font/google";
import {
  getPublicAbout,
  getPublicExperiences,
  getPublicProjects,
} from "@/lib/supabase/queries";

const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

// Immediate publishing: dynamic rendering or short revalidate so saved CMS content displays immediately
export const revalidate = 0;

export default async function HomePage() {
  const [about, experiences, projects] = await Promise.all([
    getPublicAbout(),
    getPublicExperiences(),
    getPublicProjects(),
  ]);

  return (
    <div
      className={`${archivo.variable} ${instrumentSerif.variable} landing-page min-h-screen bg-editorial-bg text-editorial-fg`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
        <Header />
        <main>
          <Hero />
          <AboutSection about={about} experiences={experiences} />
          <ProjectsGrid projects={projects} />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
