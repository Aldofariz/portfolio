import type { Experience } from "@/types/database";

interface ExperienceListProps {
  experiences: Experience[];
}

function yearOf(date: string): string {
  // Database values are ISO dates; reading the leading year avoids timezone shifts.
  const isoYear = /^(\d{4})/.exec(date)?.[1];
  return isoYear ?? date;
}

function formatPeriod(exp: Experience): string {
  const startYear = yearOf(exp.start_date);
  if (exp.is_current || !exp.end_date) return `${startYear} — Present`;
  return `${startYear} — ${yearOf(exp.end_date)}`;
}

function orderedExperiences(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    const order = a.display_order - b.display_order;
    if (order) return order;
    const startDate = b.start_date.localeCompare(a.start_date);
    if (startDate) return startDate;
    return a.id.localeCompare(b.id);
  });
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  if (experiences.length === 0) return null;

  return (
    <div className="experience-list">
      {orderedExperiences(experiences).map((exp) => (
        <article className="experience-row" key={exp.id}>
          <p className="experience-period">{formatPeriod(exp)}</p>
          <h3 className="experience-position">{exp.position}</h3>
          <p className="experience-company"><span>{exp.company}</span></p>
        </article>
      ))}
    </div>
  );
}
