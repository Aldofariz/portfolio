import type { About, Experience } from "@/types/database";
import { ExperienceList } from "./experience-list";
import { AboutScrapbook } from "./about-scrapbook";
import { AboutStatement } from "./about-statement";
import { getMediaPublicUrl } from "@/lib/utils/media";

interface AboutSectionProps {
  about: About | null;
  experiences: Experience[];
}

export function AboutSection({ about, experiences }: AboutSectionProps) {
  const photoUrl = getMediaPublicUrl(about?.profile_media?.storage_path);

  return (
    <section id="about" className="about-scope about-section border-b border-editorial-border">
      <svg className="about-svg-definitions" aria-hidden="true" focusable="false">
        <filter id="about-torn-a" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="about-torn-b" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="about-torn-mobile" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="19" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="about-section-inner">
        <AboutStatement />
        <AboutScrapbook bio={about?.introduction ?? ""} photoUrl={photoUrl} />

        {experiences.length > 0 && (
          <div className="about-experience">
            <h2 className="about-experience-title font-display">Experience</h2>
            <ExperienceList experiences={experiences} />
          </div>
        )}
      </div>
    </section>
  );
}
