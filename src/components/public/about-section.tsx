import type { About, Experience } from "@/types/database";
import { AboutPhoto } from "./about-photo";
import { ExperienceList } from "./experience-list";
import { getMediaPublicUrl } from "@/lib/utils/media";

interface AboutSectionProps {
  about: About | null;
  experiences: Experience[];
}

export function AboutSection({ about, experiences }: AboutSectionProps) {
  const profileImageUrl = getMediaPublicUrl(about?.profile_media?.storage_path);

  const introduction =
    about?.introduction ||
    "Software Engineer focusing on performant fullstack architectures, thoughtful interface engineering, and system reliability. Experienced across frontend ecosystems, backend development, and product design.";

  return (
    <section id="about" className="py-20 md:py-32 border-b border-editorial-border">
      {/* Section Header */}
      <div className="mb-12 md:mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-muted">
          Index 01 // Background
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-editorial-fg mt-2">
          ABOUT & CAREER.
        </h2>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Personal Photograph */}
        <div className="lg:col-span-5 lg:sticky lg:top-12">
          <AboutPhoto
            imageUrl={profileImageUrl}
            altText={about?.profile_media?.alt_text || "Profile photograph"}
          />
          <div className="mt-4 flex justify-between items-center text-xs font-mono text-editorial-muted">
            <span>DISCIPLINE</span>
            <span className="text-editorial-fg">Engineering & Design</span>
          </div>
        </div>

        {/* Right Column: Bio & Experience */}
        <div className="lg:col-span-7 space-y-16">
          {/* Biography Subsection */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
              01. Introduction
            </h3>
            <p className="text-xl sm:text-2xl text-editorial-fg font-normal leading-relaxed tracking-tight">
              {introduction}
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs font-mono uppercase tracking-wider text-editorial-muted border-l-2 border-editorial-accent pl-3">
                Education: Informatics Engineering at Universitas Islam Nusantara
              </span>
            </div>
          </div>

          {/* Experience Subsection */}
          <div className="space-y-6 pt-4 border-t border-editorial-border">
            <div className="flex justify-between items-baseline">
              <h3 className="font-mono text-xs uppercase tracking-widest text-editorial-accent">
                02. Experience
              </h3>
              <span className="text-xs font-mono text-editorial-muted">
                (Chronological)
              </span>
            </div>

            <ExperienceList experiences={experiences} />
          </div>
        </div>
      </div>
    </section>
  );
}
